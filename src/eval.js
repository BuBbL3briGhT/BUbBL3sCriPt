const List = require("./list");
const Ṣymbol = require("./symbol");
const { parse } = require("./parse");
const events = require("./events");
const consola = require("./consola");

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
function evalExpression(binding, expression) {
  return expression.eval ?
    expression.eval(binding) : expression;
}

function ëval(binding, expression) {
  return expression.evalEach(binding);
}

// Evaluates a parameter list.
function evalParams(binding, params) {
  const splits = params.split(sAmp);
  if (splits.count() > 1) {
    params = splits.first.mapEval(binding)
      .conj(splits.pop().peek().peek()
            .eval(binding));
  } else {
    params = params.mapEval(binding)
  }
  return params;
}

module.exports = { ėval, ëval, evalExpression,
  evalParams };

