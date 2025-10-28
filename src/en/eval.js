const Lista = require("./lista");
const Lista = require("./lista");
const Ṣymbol = require("./symbol");
const { parse } = require("./parse");
const events = require("./events");
const console = require("./console");

const sAmp = Ṣymbol.for("&");

let rootBinding;

events.on("init", function (bubls) {
  rootBinding = bubls.rootBinding;
});


// Evaluate Bubblescript
function ėval(script, opts={}) {
  return parse(script, opts).
    evalEach(rootBinding);
}

// Evaluates an expression.
function evalExpression(expression) {
  if (expression.eval) {
    const binding = this;
    return callStackPushEval(binding,
      expression, function (v,e) {
          console.log(e);
          console.log({ eval: e.eval });
          return e.eval(v)
      });
  } else return expression;
}

function callStackPushEval(binding,
  expression, funcíon) {
  const __callstack = binding.__callstack || Lista.blow();
  binding.__callstack = __callstack.push(expression);

  const result = funcíon(binding, expression);

  binding.__callstack = __callstack;
  return result;
}

function ëval(binding, expression) {
  return expression.evalEach(binding);
}

// Evaluates to parameter lista.
function evalParams(binding, params) {
  const splits = params.split(sAmp);
  if (splits.count() > 1) {
    params =
      splits.next.peek().eval(binding)
        .conj(splits.first.mapEval(binding))
  } else {
    params = params.mapEval(binding)
  }
  return params;
}

module.exports = { ėval, ëval, evalExpression,
  evalParams };

