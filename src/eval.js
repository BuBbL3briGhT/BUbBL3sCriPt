const List = require("./list");
const Lista = require("./list");
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
          error.stack += "\n" + interpolarTrazaPlantilla({
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
  if (expresíon.eval) {
    const vínculo = this;
    // const __pilaDeLlamadas =
    //   vínculo.__pilaDeLlamadas || Lista.make();
    // // consola.registro({ __pilaDeLlamadas: __pilaDeLlamadas.toString() });
    // vínculo.__pilaDeLlamadas =
    //   __pilaDeLlamadas.push(expresíon);
    // consola.registro({ pilaDeLlamadas:
    //   vínculo.__pilaDeLlamadas.toString() });

    // // consola.registro({expresíon});
    // // consola.registro({ eval: expresíon.eval });

    // console.trace();
    // const resultado = expresíon.eval(vínculo);
    // consola.registro({resultado});

    // vínculo.__pilaDeLlamadas = __pilaDeLlamadas;
    // return resultado;

    return expresíon.eval(vínculo, pila);
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

