const List = require("./list");
const Lista = require("./list");
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
function evalExpression(expresíon) {
  if (expresíon.eval) {
    const vínculo = this;
    const __pilaDeLlamadas =
      vínculo.__pilaDeLlamadas || Lista.make();
    vínculo.__pilaDeLlamadas =
      __pilaDeLlamadas.push(expresíon);

    consola.registro(expresíon);
    consola.registro({ eval: expresíon.eval });

    const resultado = expresíon.eval(vínculo);

    vínculo.__pilaDeLlamadas = __pilaDeLlamadas;
    return resultado;
  } else return expresíon;
}

function ëval(binding, expression) {
  return expression.evalEach(binding);
}

// Evaluates a parameter list.
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

module.exports = { ėval, ëval, evalExpression,
  evalParams };

