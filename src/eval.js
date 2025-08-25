const AbstractList = require("./abstract_list");
const List = require("./list");
const Vector = require("./vector");
const ObjectMap = require("./object_map");
const Fn = require("./fn");
const { Macro, MacroExpanded } = require("./macro");
const Bubble = require("./bubble");
const Ṣymbol = require("./symbol");
const { parse } = require("./parse");
const LazyList = require("./lazy_list");
const events = require("./events");

const sAmp = Ṣymbol.for("&");

let rootBinding;

events.on("init", function (bubls) {
  rootBinding = bubls.rootBinding;
});

// Evaluate Bubblescript
function ėval(script) {
  return parse(script).eval(rootBinding);
}

function ëval(bnd, xpr) {
  // console.log("xpr", xpr);
  switch (xpr && xpr.constructor) {
    case Ṣymbol:
      return xpr.resolve(bnd)
    case List: {
      let s = xpr.peek();
      if (s instanceof Ṣymbol) {
        if (s.callPattern == 1) {
          //  x or x/x or x.x/x
          let q = ëval(bnd, s);
          if (q != s)
            return ëval(bnd,
              xpr.pop().push(q));
          else
            return xpr;
        } else /* send */ {
          // console.log("xpr", xpr);
          // call pattern 2
          // x.x or x.x.x or x.x...
          let params;
          let resolvedRoot = s.resolveRoot(bnd)
          if (resolvedRoot === undefined) {
            // consola.registro(s + " is undefined");
            throw new TypeError(s + " is undefined.");
          }
          const fn = resolvedRoot[s.fn];
          try {
            if (xpr.rest) {
              params = xpr.rest;
              let splits = params.split(sAmp);
              if (splits.count() > 1) {
                params = ëval(bnd, splits.rest.head.head);
                params = params.conj(splits.first.mapEval(bnd));
              } else {
                params = params.mapEval(bnd);
              }
            }

            return fn(...params);
          } catch (e) {
            // console.log(s.fn);
            throw e;
          }
        }
      } else if (s instanceof List) {
        return ëval(bnd,
          xpr.pop().push(ëval(bnd, s)))
      } else if (s instanceof Fn) {
        return s.invoke(xpr.pop().mapEval(bnd));
      } else if (s instanceof Function) {
        return s.call(bnd, xpr.pop());
      } else if (s instanceof Macro) {
        let expanded = s.expand(xpr.pop());
        throw new MacroExpanded(expanded);
      } else {
        return undefined;
      }
    }
    case Vector:
      return xpr.mapEval(bnd);
    case ObjectMap:
      return xpr.createObject(bnd);
    case Bubble:
      return xpr.pop();
    default:
      return xpr;
  }
};

module.exports = { ėval, ëval };
