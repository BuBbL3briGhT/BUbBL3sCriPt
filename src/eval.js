const List = require("./list");
const Lista = require("./list");
const Ṣymbol = require("./symbol");
const { parse } = require("./parse");
const events = require("./events");
const consola = require("./consola");
const { UndefinedFunctionError }
  = require("./errors");
const { interpolate } = require("./strings");

const traceTemplate = "    en (${file}:${line}:${column})";
const interpolateTrace = interpolate.bind(traceTemplate);
const { MacroExpanded } = require("./macro");

const sAmp = Ṣymbol.for("&");

/**
 * @function ėval
 * @description Evaluates a string of Bubblescript code.
 * @param {Object} - The binding to evaluate the code in.
 * @param {string} script - The code to evaluate.
 * @param {Object} [opts={}] - Options for the parser.
 * @returns {*} The result of the last expression in the script.
 */
function ėval(binding, script, opts={}) {
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
 * @description Evaluates each element of the list and returns the result of the last evaluation.
 * @param {Object} binding - The binding to evaluate the elements in.
 * @param {List} list - A list to evalEach over.
 * @param {List} [stack=List.blow()] - The evaluation stack.
 * @returns {*} The result of the last evaluation.
 */
evalEach(binding, list, stack) {
  const _evalExpression = evalExpression.bind(null,
    binding);
  return list.tryEach(_evalExpression,
    catchExpandMacro, stack);
}

// /**
//  * @function evalExpression
//  * @description Evaluates a single expression.
//  * @param {*} expression - The expression to evaluate.
//  * @param {Array} [stack=[]] - The evaluation stack.
//  * @returns {*} The result of the expression.
//  */
// function evalExpression(expression, stack) {
//   if (expression.eval) {
//     return expression.eval(this, stack);
//   } else return expression;
// }

/**
 * @function evalExpression
 * @description Evaluates a single expression.
 * @param {*} expression - The expression to evaluate.
 * @param {Array} [stack=[]] - The evaluation stack.
 * @returns {*} The result of the expression.
 */
function evalExpression(binding, expression, stack) {
  switch (expression.constructor) {
    case List:
      return evalList(binding, expression, stack);
    default:
      if (expression.eval) {
        return expression.eval(binding, stack);
      } else return expression;
  }
}

/**
 * @function evalParams
 * @description Evaluates a list of parameters.
 * @param {Object} binding - The binding to evaluate the parameters in.
 * @param {List} params - The list of parameters to evaluate.
 * @returns {List} The evaluated parameters.
 */
function evalParams(binding, params) {
  const splits = params.split(sAmp);
  if (splits.count() > 1) {
    params =
      // splits.pop().peek().peek().eval(binding)
      splits.next.peek().eval(binding)
        .conj(splits.first.mapEval(binding))
  } else {
    // consola.registro({binding});
    params = params.mapEval(binding);
  }
  return params;
}

/**
 * @method evalList
 * @description Evaluates the list as a function call.
 * @param {List} list - The list to evaluate.
 * @param {Object} binding - The binding to evaluate the list in.
 * @param {List} [stack=List.blow()] - The evaluation stack.
 * @returns {*} The result of the function call.
 */
evalList(binding, list, stack=List.blow()) {
  try {
    const { file, line, column } = list;
    stack = stack.push({func: list.head.toString(),
        file, line, column});

    const func = evalExpression(binding, list.head);

    if (func == undefined) {
      const Error = UndefinedFunctionError;
      throw new Error(binding, list.head, stack);
    }

    return Funk.call(binding, func, list.tail, stack);

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

mapEvalList(list, binding) {
  return list.map(evalExpression.bind(null, binding));
}

function catchExpandMacro(o, list, funk) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    list.o  = expanded.first;
    list.oo = list.rest.conj(expanded.rest.invert());
    return list.tryEach(funk, catchExpandMacro);
  } else {
    throw o;
  }
}

module.exports = { ėval, evalExpression, evalParams,
  evalList, evalEach, mapEvalList };

