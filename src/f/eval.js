const parse = require("./parse");

const List    = require("../o/list");
const Bubbles   = require("../o/bubbles");
const Keyword = require("../o/keyword");
const Fn      = require("../o/fn");
const Macro   = require("../o/macro");
const Symbol  = require("../o/symbol");
const Bubble  = require("../o/bubble");

const { map, peek, pop, push, toArray } =
  Bubbles;

// Evaluate Bubblesscript
function eval(script) {
  return parse(script)
    .map(function(expression) {
      return eVaL(rootBinding, expression);
    }).peek();
}

function eVaL(bnd, xpr) {
  switch (xpr && xpr.constructor) {
    case Symbol:
      return xpr.resolve(bnd)
    case Bubbles: {
      let s = peek(xpr);
      if (s instanceof Symbol) {
        if (s.callPattern == 1) {
          //  x or x/x or x.x/x
          let q = eVaL(bnd, s);
          if (q != s)
            return eVaL(bnd,
              push(pop(xpr), q));
          else
            return xpr;
        } else /* send */ {
          // call pattern 2
          // x.x or x.x.x or x.x...
          let q = s.resolveRoot(bnd)
          if (!xpr.rest) {
            return q[s.fn]()
          }
          try {
            return q[s.fn](...toArray(map(xpr.rest,
              function(a) {
                return eVaL(bnd, a);
              })));
          } catch (e) {
            console.log(s.fn);
            throw e;
          }
        }
      } else if (s instanceof Bubbles) {
        return eVaL(bnd,
          push(pop(xpr), eVaL(bnd, s)))
      } else if (s instanceof Fn) {
        return s.call(bnd, pop(xpr));
      } else if (s instanceof Function) {
        return s.call(bnd, pop(xpr));
      } else if (s instanceof Macro) {
        return s.call(bnd, pop(xpr));
      } else {
        return undefined;
      }
    }
    case List:
      return List.map(xpr, (a) => {
        return eVaL(bnd, a)
      });
    case Fn:
    // case Macro:
      return xpr.body.each((xpr) => {
        return eVaL(bnd, xpr);
      });
    case Bubble:
      return xpr.pop();
    default:
      return xpr;
  }
};

eval.eVaL = eVaL;
module.exports = eval;


const rootBinding = require("../o/root_binding");

// const Base = require("./base");
// console.debug('eval Base 88', Base);
// const Util = require("./util");
// const rootBinding = Util.makeRootBinding(Base, eval.eVaL);
// console.debug('rootBinding', rootBinding);
// eval.rootBinding = rootBinding;


