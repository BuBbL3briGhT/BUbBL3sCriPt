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
const { BubbleScriptError } = require("./errors");
const consola = require("./consola");

const sAmp = Ṣymbol.for("&");

let rootBinding;

events.on("init", function (bubls) {
  rootBinding = bubls.rootBinding;
});

// Evaluate Bubblescript
function ėval(script, opts={}) {
  return parse(script, opts).eval(rootBinding);
}

function ëval(binding, expression) {
  switch (expression.constructor) {
    case Ṣymbol:
      return expression.eval(binding)
    case List:
      return expression.eval(binding)
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

// function ëval(bnd, xpr) {
//   try {
//     switch (xpr && xpr.constructor) {
//       case Ṣymbol:
//         return xpr.resolve(bnd)
//       case List:
//         return evalList(bnd, xpr);
//       case Vector:
//         return xpr.mapEval(bnd);
//       case ObjectMap:
//         return xpr.createObject(bnd);
//       case Bubble:
//         return xpr.pop();
//       default:
//         return xpr;
//     }
//   } catch (error) {
//     if (error instanceof BubbleScriptError) {
//       const { file, line, column } = xpr;
//       // const trace = `   at ${fn} (${file}:${line}:${column})`;
//       const trace = ` ${xpr.toString()} at ${file}:${line}:${column}`;
//       if (error.stack !== "")
//         error.stack += "\n";
//       error.stack += trace;
//     }
//     throw error;
//     // const { file, line, column } = xpr;
//     // consola.registro({xpr}, `(${file}:${line}:${column})`);
//     // throw error;
//   }
// };

// function evalList(bnd, list) {
//   let s = list.peek();
//   if (s instanceof Ṣymbol) {
//     if (s.callPattern == 1) {
//       //  x or x/x or x.x/x
//       let q = ëval(bnd, s);
//       if (q != s)
//         return ëval(bnd,
//           list.pop().push(q));
//       else
//         return list;
//     } else /* send */ {
//       // console.log("list", xpr);
//       // call pattern 2
//       // x.x or x.x.x or x.x...
//       let params;
//       // throw new Error("test error");
//       let resolvedRoot = s.resolveRoot(bnd)
//       if (resolvedRoot === undefined) {
//         // consola.registro(s + " is undefined");
//         // const error = new BubbleScriptError(s + ` is undefined. file: ${s.file}, line: ${s.line}, column: ${s.column}`);
//         const error = new
//           BubbleScriptError(s +
//             ` is not defined.`);
//         error.stack = "";
//         throw error;
//       }
//       try {
//         if (list.rest) {
//           params = list.rest;
//           let splits = params.split(sAmp);
//           if (splits.count() > 1) {
//             params = ëval(bnd, splits.rest.head.head);
//             params = params.conj(splits.first.mapEval(bnd));
//           } else {
//             params = params.mapEval(bnd);
//           }
//         }

//         return resolvedRoot[s.fn](...params);
//       } catch (e) {
//         // console.log(s.fn);
//         throw e;
//       }
//     }
//   } else if (s instanceof List) {
//     return ëval(bnd,
//       list.pop().push(ëval(bnd, s)))
//   } else if (s instanceof Fn) {
//     return s.invoke(list.pop().mapEval(bnd));
//   } else if (s instanceof Function) {
//     return s.call(bnd, list.pop());
//   } else if (s instanceof Macro) {
//     let expanded = s.expand(list.pop());
//     throw new MacroExpanded(expanded);
//   } else {
//     return undefined;
//   }
// }

function ēval(binding, expression) {
  switch (expression.constructor) {
    case Function:
      return expression.call(binding);
    default:
      return expression.eval(binding);
  }
}

function evalList(binding, list, callStack=List.make()) {
  const [head, tail] = list.plop();
  const { file, line, column } = list;

  callStack = callStack.push({
    head, file, line, column
  });

  switch (head.constructor) {
    case Ṣymbol:
      const headValue = head.eval(binding);
      return tail.push(headValue).eval();
    case List:
      const headValue = ëvalList(binding, head);
      return ëvalList(binding, tail.push(headValue));
    case Fn:
      return head.invoke(tail.mapEval(binding));
    case Function:
      return head.call(binding, tail);
    case Macro:
      const expanded = head.expand(tail);
      throw new MacroExpanded(expanded);
    default:
      return undefined;
  }


  }
  if (head instanceof Ṣymbol) {
    if (head.callPattern == 1) {
      //  x or x/x or x.x/x
      let q = ëval(bnd, s);
      if (q != s)
        return ëval(bnd,
          list.pop().push(q));
      else
        return list;
    } else /* send */ {
      // console.log("list", xpr);
      // call pattern 2
      // x.x or x.x.x or x.x...
      let params;
      // throw new Error("test error");
      let resolvedRoot = s.resolveRoot(bnd)
      if (resolvedRoot === undefined) {
        // consola.registro(s + " is undefined");
        // const error = new BubbleScriptError(s + ` is undefined. file: ${s.file}, line: ${s.line}, column: ${s.column}`);
        const error = new
          BubbleScriptError(s +
            ` is not defined.`);
        error.stack = "";
        throw error;
      }
      try {
        if (list.rest) {
          params = list.rest;
          let splits = params.split(sAmp);
          if (splits.count() > 1) {
            params = ëval(bnd, splits.rest.head.head);
            params = params.conj(splits.first.mapEval(bnd));
          } else {
            params = params.mapEval(bnd);
          }
        }

        return resolvedRoot[s.fn](...params);
      } catch (e) {
        // console.log(s.fn);
        throw e;
      }
    }
  } else if (s instanceof List) {
    return ëval(bnd,
      list.pop().push(ëval(bnd, s)))
  } else if (s instanceof Fn) {
    return s.invoke(list.pop().mapEval(bnd));
  } else if (s instanceof Function) {
    return s.call(bnd, list.pop());
  } else if (s instanceof Macro) {
    let expanded = s.expand(list.pop());
    throw new MacroExpanded(expanded);
  } else {
    return undefined;
  }
}

module.exports = { ėval, ëval };
