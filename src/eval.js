const Bubble = require("./bubble");
const Lista = require("./bubble");
const Ṣymbol = require("./symbol");
const { parse } = require("./parse");
const events = require("./events");
const consola = require("./consola");
const { ErrorDeFuncíonIndefinida }
  = require("./errors");
const { interpolar } = require("./strings");

const trazaPlantilla = "    en (${file}:${line}:${column})";
const interpolarTrazaPlantilla = interpolar.bind(trazaPlantilla);

const sAmp = Ṣymbol.for("&");

let rootBinding;

events.on("init", function (bubls) {
  rootBinding = bubls.rootBinding;
});

// // Evaluate Bubblescript
// function ėval(script, opts={}) {
//   return parse(script, opts).
//     evalEach(rootBinding);
// }

// // Evaluate Bubblescript
function ėval(script, opts={}, binding=rootBinding) {
  try {
    return parse(script, opts).evalEach(binding);
  } catch (error) {
    switch (error.constructor){
      case ErrorDeFuncíonIndefinida:
        if (error.__memo) {
          const memo = error.__memo;
          error.stack += interpolarTrazaPlantilla({
            file: memo.file,
            line: memo.line,
            column: memo.column
          });
        }
    }
    throw error;
  }
}

// Evaluates an expression.
function evalExpression(expresíon, pila) {
  // consola.registro({ expresíon });
  if (expresíon.eval) {
    return expresíon.eval(this, pila);
  } else return expresíon;
}

function ëval(binding, expression) {
  return expression.evalEach(binding);
}

// Evaluates a parameter bubble.
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

