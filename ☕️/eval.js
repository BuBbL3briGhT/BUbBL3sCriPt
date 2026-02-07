/* * *  * * *  * *  * *  * * *  * * *  * *  * *
 *                                            *
 *        File: src/eval.js                   *
 *        Date: December, 2025                *
 *        Library: Bubblescript               *
 *        Author(s): BaMbii                   *
 *                                            *
 * * *  * * *  * *  * *  * * *  * * *  * *  * */

import { List, LazyList } from './list.js';
import Ṣymbol from './symbol.js';
import Bubble from './bubble.js';
import Fn from './fn.js';
import { parse } from './parse.js';
import { interpolate } from './strings.js';
import { MacroExpanded } from './macro.js';
import { UndefinedFunctionError } from './errors.js';
const { debug, log, trace } = console;

const traceTemplate = '    en (${file}:${line}:${column})';
const interpolateTrace = interpolate.bind(traceTemplate);
const sAmp = Ṣymbol.for('&');

/**
 * @function ėval
 * @description Evaluates a string of Bubblescript
 * code.
 * @param {Object} - The binding to evaluate the code
 * in.
 * @param {string} script - The code to evaluate.
 * @param {Object} [opts={}] - Options for the parser.
 * @returns {*} The result of the last expression in
 * the script.
 */
export function ėval(binding, script, opts = {}) {
  try {
    return evalEach(binding, parse(script, opts));
  } catch (error) {
    switch (error.constructor) {
      case UndefinedFunctionError:
        if (error.__memo) {
          const memo = error.__memo;
          error.stack += interpolateTrace({
            file: memo.file,
            line: memo.line,
            column: memo.column,
          });
        }
    }
    throw error;
  }
}

/**
 * @method evalEach
 * @description Evaluates each element of the list
 * and returns the result of the last evaluation.
 * @param {Object} binding - The binding to evaluate
 * the elements in.
 * @param {List} list - A list to evalEach over.
 * @param {List} [stack=List.make()] - The evaluation
 * stack.
 * @returns {*} The result of the last evaluation.
 */
export function evalEach(binding, list, stack) {
  // console.log({list}, "🧀");
  const _evalExpression = evalExpression.bind(null, binding);

  // We can't expand macros on a lazy list right now, so need to convert to a list right now, If we add support for maxlcro expansion, we won't need to do this. That should be possible.
  if (list.constructor === LazyList) list = list.toList();

  return list.tryEach(_evalExpression, catchExpandMacro, stack);
}

/**
 * @function evalExpression
 * @description Evaluates a single expression.
 * @param {object} binding - A binding to evalute the
 * expression against.
 * @param {*} expression - The expression to evaluate.
 * @param {Array} [stack=[]] - The evaluation stack.
 * @returns {*} The result of the expression.
 */
export function evalExpression(binding, expression) {
  switch (expression?.constructor) {
    case List:
      // console.debug(1, expression.toString());
      return evalList(binding, expression);
    case Ṣymbol:
      return expression.resolve(binding);
    case Bubble:
      return expression.pop();
    default:
      return expression;
  }
}

/**
 * @function evalList
 * @description Evaluates the list as a function call.
 * @param {Object} binding - The binding to evaluate
 * the list in.
 * @param {List} list - The list to evaluate.
 * @param {List} [stack=List.make()] - The evaluation
 * stack.
 * @returns {*} The result of the function call.
 */
export function evalList(binding, list) {
  try {
    // console.debug({list});
    // console.debug(1, list.toString());

    const { head, tail, file, line, column } = list;

    switch (typeof head) {
      case 'string':
        if (tail.isEmpty) return binding.require(head);
        else return evalExpression(binding, tail.peek())[head];
      case 'number':
        const indexed = evalExpression(binding, list.next);
        return indexed.at(head);
      case 'object':
      case 'function':
        // console.log(3, head.constructor.name.toString());
        switch (head.constructor.name.toString()) {
          case 'Ṣymbol':
            const s = head;
            if (s.message) {
              const o = s.resolveSegments(binding);
              return evalList(binding, tail.push(s.message).push(o));
            } else {
              // console.debug({s});
              const _ = s.resolve(binding);
              // console.debug({_});
              return evalList(binding, tail.push(_));
            }
          case 'Fn':
          case 'Function':
          case 'SpecialForm':
          case 'SpecialFormP':
          case 'Macro':
            return Fn.call(binding, head, tail, null, ėval);
          case 'List':
            return evalList(binding, tail.push(evalList(binding, head)));
          default: // object: Send (message with params to object.
            // console.debug({head});
            // console.debug("tail", tail.toString());
            // const prop =
            //   evalExpression(binding, tail.head);
            const fn = head[tail.head];

            // console.debug({head, prop, fn});
            // console.debug({fn});
            switch (fn.constructor.name.toString()) {
              case 'Function':
                // return fn(...tail.tail);
                return fn(...evalParams(binding, tail.tail));
              default:
                return fn.call(head, ...tail.tail);
            }
        }
      default:
        const Error = UndefinedFunctionError;
        throw new Error(binding, head);
    }
  } catch (error) {
    // console.log(error);
    // throw error;
    switch (error.constructor) {
      case UndefinedFunctionError:
        // console.log(1, list);
        if (error.__memo) {
          const memo = error.__memo;
          error.stack +=
            interpolateTrace({
              func: list.head,
              file: memo.file,
              line: memo.line,
              column: memo.column,
            }) + '\n';
        }
        const { file, line, column } = list;
        error.__memo = { file, line, column };
        break;
      default:
      // (function () {
      //   const { head, file, line, column } = list;
      //   error.stack += "\n" + interpolateTrace({
      //     func: head, file, line, column
      //   });
      // }).call(list);
    }
    throw error;
  }
}

// /**
//  * @function evalSymbol
//  * @description Evaluates a single symbol.
//  * @param {object} symbol - A binding to evalute the
//  * symbol with.
//  * @param {*} symbol - The symbol to evaluate.
//  * @returns {*} The result of evaluating the symbol.
//  */
// export function evalSymbol(binding, symbol, params) {
//   const o = symbol.resolve(binding);
//   const fnKey = symbol.fn
//   if (fnKey) {
//     const fn = o[fnKey];
//     return fn.call(binding, ...params);
//   } else {
//     switch (fn.constructor) {
//       case Fn:
//       case Function:
//         return fn(...params);

//   }

//   if (context === "list") {
//     // Context: "list" indicates this is being evaluated as
//     // the first item in a list, therefore is should convert to
//     // a send, with the last segment being the message. Parameters
//     // will be appended in evalList.
//     // TODO: Implement.
//   } else {
//     const root = symbol.resolveRoot(binding);
//     return root ? root[symbol.fn] : root;
//   }
// }

/**
 * @function evalParams
 * @description Evaluates a list of parameters.
 * @param {Object} binding - The binding to evaluate
 * the parameters in.
 * @param {List} params - The list of parameters to
 * evaluate.
 * @returns {List} The evaluated parameters.
 */
export function evalParams(binding, params) {
  const splits = params.split(sAmp);
  if (splits.count() > 1) {
    params = evalEach(binding, splits.next).conj(
      mapEval(binding, splits.first),
    );
  } else {
    params = mapEval(binding, params);
  }
  return params;
}

/**
 * @function mapEval
 * @description Evaluates and maps each item in a
 * list into a new list.
 * @param {Object} binding - The binding to evaluate
 * the list in.
 * @param {List} list - The list to evaluate.
 * @returns {*} The mapped list of evauluations.
 */
export function mapEval(binding, list) {
  return list.map(evalExpression.bind(null, binding));
}

/**
 * @function catchExpandMacro
 * @description Catch-handeler for macro expansion.
 * @param {Object} o - Control object that was thrown.
 * @param {List} list - The list being processed.
 * @param {Fn} fn - A function to continue applying
 * to each item in list.
 * @returns {*} The result of calling tryEach on the
 * list.
 */
export function catchExpandMacro(o, list, fn) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    list.o = expanded.first;
    list.oo = list.rest.conj(expanded.rest.invert());
    return list.tryEach(fn, catchExpandMacro);
  } else {
    throw o;
  }
}

Object.assign(ėval, {
  ėval,
  evalExpression,
  evalParams,
  evalList,
  evalEach,
  mapEval,
});
