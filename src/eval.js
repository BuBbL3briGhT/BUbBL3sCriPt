
const Bubble = require("./bubble");
const Keyword = require("./keyword");
const parse = require("./parse");
const Balloon = require("./balloon");
const Fn = require("./fn");
const Macro = require("./macro");
const Symbol = require("./symbol");
// const Symbobl = require("./symbobl");
const Quoted = require("./quoted");

const { map, peek, pop, push } = Bubble;

function makeFn(q) {
  return (p) => {
    return q.call(this,
      p.map(m => eVaL(this, m)))
  }
}

const rootBinding = {
  "+": makeFn(([a,[b]]) => {
    console.log(a, b);
    return a+b
  })
}

// Evaluate Bubblescript
function eval(script) {
  return parse(script)
    .map(function(expression) {
      return eVaL(rootBinding, expression);
    }).peek();
}

function debug(...params) {
  console.log(...params);
}

function eVaL(bnd, xpr) {
  // console.log(xpr)
  switch (xpr && xpr.constructor) {
    case Symbol:
      // debug('->', xpr.resolve(bnd));
      return xpr.resolve(bnd)
    case Bubble: {
      // console.log("🧀");
      let s = peek(xpr);
      debug('->', s instanceof Symbol);
      if (s instanceof Symbol) {
      // if (typeof s == "symbol") {
        // debug('->', xpr.toString());
        // debug('->', s.callPattern);
        // let q = eVaL(bnd, s);
        // if (q != s)
        //   return eVaL(bnd,
        //     push(pop(xpr), q));
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
          let q = resolveRoot(bnd, s)
          if (!xpr.rest) {
            return q[s.fn]()
          }
          try {
            return q[s.fn](...xpr.rest.map(
              function(a) {
                return eVaL(bnd, a)
              }).toArray())
          } catch (e) {
            console.log(s.fn);
            throw e;
          }
        }
      } else if (s instanceof Bubble) {
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
    case Balloon:
      return map(xpr, (a) => {
        return eVaL(bnd, a)
      });
    case Fn:
    // case Macro:
      return each(xpr.body, (xpr) => {
        return eVaL(bnd, xpr);
      });
    case Quoted:
      return unquote(xpr);
    default:
      return xpr;
  }
};


module.exports = eval;


