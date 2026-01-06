
  /* * *  * * *  * *  * *  * * *  * * *  * *  * *
   *                                            *
   *        File: src/eval.js                   *
   *        Date: December, 2025                *
   *        Library: Bubblescript               *
   *        Author(s): BaMbii                   *
   *                                            *
   * * *  * * *  * *  * *  * * *  * * *  * *  * */

import { List, LazyList } from "./list.js";
import Ṣymbol from "./symbol.js";
import Bubble from "./bubble.js";
import Fn from "./fn.js";
import { parse } from "./parse.js";
import { interpolate } from "./strings.js";
import { MacroExpanded } from "./macro.js";
import { UndefinedFunctionError } from "./errors.js";

const traceTemplate = "    en (${file}:${line}:${column})";
const interpolateTrace = interpolate.bind(traceTemplate);
const sAmp = Ṣymbol.for("&");

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
export function ėval(binding, script, opts={}) {
  try {
    return evalEach(binding, parse(script, opts));
  } catch (error) {
    switch (error.constructor){
      case UndefinedFunctionError:
        if (error.__memo) {
          const memo = error.__memo;
          error.stack += interpolateTrace({
            file: memo.file,
            line: memo.line,
            column: memo.column
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
  const _evalExpression =
    evalExpression.bind(null, binding);

  // We can't expand macros on a lazy list right now, so need to convert to a list right now, If we add support for maxlcro expansion, we won't need to do this. That should be possible.
  if (list.constructor === LazyList)
    list = list.toList();

  console.log({list}, "eval.js:73");
  return list.tryEach(_evalExpression,
    catchExpandMacro, stack);
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
export function evalExpression(binding, expression, stack) {
  switch (expression.constructor) {
    case List:
      return evalList(binding, expression, stack);
    case Ṣymbol:
      return evalSymbol(binding, expression);
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
export function evalList(binding, list, stack=List.make()) {
  try {
    const { file, line, column } = list;
    stack = stack.push({func: list.head.toString(),
        file, line, column});

    const fn = evalExpression(binding, list.head);

    if (fn == undefined) {
      const Error = UndefinedFunctionError;
      throw new Error(binding, list.head, stack);
    }

    return Fn.call(binding, fn, list.tail, stack, ėval);

  } catch (error) {
    switch (error.constructor){
      case UndefinedFunctionError:
        if (error.__memo) {
          const memo = error.__memo;
          error.stack += interpolateTrace({
            func: list.head,
            file: memo.file,
            line: memo.line,
            column: memo.column
          }) + "\n";
        }
        const { file, line, column } = list;
        error.__memo = { file, line, column }
        break;
      default:
        (function () {
          const { head, file, line, column } = list;
          error.stack += "\n" + interpolateTrace({
            func: head, file, line, column
          });
        }).call(list);
    }
    throw error;
  }
}

/**
 * @function evalSymbol
 * @description Evaluates a single symbol.
 * @param {object} symbol - A binding to evalute the
 * symbol with.
 * @param {*} symbol - The symbol to evaluate.
 * @returns {*} The result of evaluating the symbol.
 */
export function evalSymbol(binding, symbol) {
  const root = symbol.resolveRoot(binding);
  return root ? root[symbol.fn] : root;
}

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
    params =
      evalEach(binding, splits.next)
        .conj(mapEval(binding, splits.first));
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
    list.o  = expanded.first;
    list.oo = list.rest.conj(expanded.rest.invert());
    return list.tryEach(fn, catchExpandMacro);
  } else {
    throw o;
  }
}

Object.assign(ėval ,{
  ėval, evalExpression, evalParams, evalList,
  evalEach, mapEval
});
