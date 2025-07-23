const List    = require("../o/list");
const Vector  = require("../o/vector");
const Symbol  = require("../o/symbol");
const Keyword = require("../o/keyword");
const Bubble  = require("../o/bubble");
const MacroExpanded = require("../o/macro_expanded");

const parse = require("./parse");

// Evaluate Bubblescript
function eval(script) {
  return parse(script).evalEach(rootBinding);
}

function eVaL(bnd, xpr) {
  switch (xpr && xpr.constructor) {
    case Symbol:
      return xpr.resolve(bnd)
    case List: {
      let s = xpr.peek();
      if (s instanceof Symbol) {
        if (s.callPattern == 1) {
          //  x or x/x or x.x/x
          let q = eVaL(bnd, s);
          if (q != s)
            return eVaL(bnd,
              xpr.pop().push(q));
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
            return q[s.fn](...xpr.rest.map(
              (a) => eVaL(bnd, a)).toArray());
          } catch (e) {
            // console.log(s.fn);
            throw e;
          }
        }
      } else if (s instanceof List) {
        return eVaL(bnd,
          xpr.pop().push(eVaL(bnd, s)))
      } else if (s instanceof Fn) {
        return s.invoke(xpr.pop().map(arg =>
          eVaL(bnd, arg)));
      } else if (s instanceof Function) {
        return s.call(bnd, xpr.pop());
      } else if (s instanceof Macro) {
        let expanded = s.expand(xpr.pop());
        throw new MacroExpanded(expanded);
        // return expanded.evalEach(bnd);
      } else {
        return undefined;
      }
    }
    case Vector:
      return xpr.map((a) => {
        return eVaL(bnd, a)
      });
    case Bubble:
      return xpr.pop();
    default:
      return xpr;
  }
};

eval.eVaL = eVaL;
module.exports = eval;

const Macro   = require("../o/macro");
const Fn      = require("../o/fn");

const rootBinding = require("../o/root_binding");
