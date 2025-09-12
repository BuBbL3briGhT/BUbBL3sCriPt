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
function evalExpression(expresíon) {
  if (expresíon.eval) {
    const vínculo = this;
    return pilaDeLlamadasEmpujarEval(vínculo,
      expresíon, (v,e) => e.eval(v));
  } else return expresíon;
}

// Esta es una pequeña función peculiar que pretende
// simplificar, pero probablemente complique un poco
// las cosas. La dejo por ahora, pero probablemente
// exista una forma mucho más clara y sencilla de
// expresarlo. No me gustan mucho los nombres de
// función largos, ya que son una forma de código
// fétido. Básicamente, solo sirve como
// representación de una idea y quizás para
// proporcionar claridad. Esta función espera un
// enlace y una expresión; luego, reemplaza la
// propiedad especial reservada de la pila con una
// nueva pila que tiene la expresión insertada en la
// parte superior. Luego, invoca la función
// devolviendo el enlace y la expresión como
// parámetros; tras almacenar el valor devuelto,
// restablece la propiedad especial reservada de la
// pila en el enlace al valor anterior y, finalmente,
// devuelve el valor recibido de la llamada a la
// función. #AbstracciónConFiltración
// #ExcesoDeAcciones #NombreDeFunciónLargo
//
// This right here is a crazy little function that is
// meant to simplify, but probably makes things a bit
// more complex. Leaving it in for now but there is
// probably a much cleaner and simpler way to express
// this. I'm not a huge fan of long function names
// as they are a form of code smell. It's mostly just
// serving as a representation of an idea and maybe
// providing a notion of clarity. This function
// expects a binding and an expression, it then
// replaces the special reserved stack property with
// a new stack that has the expresion pushed on top.
// It then invokes the function passing back the
// binding and expression as parameters, after
// storing the returned value, it resets the special
// reserved stack property in the binding to the
// previously value and finally, returns the value it
// recieved from the function call.
// #leakyAbstraction #overKill #longFunctionName
//
// This comment was tanslated to Española by Google
// (https://www.google.com/search?q=translate)
function pilaDeLlamadasEmpujarEval(vínculo,
  expresíon, funcíon) {
  const __pilaDeLlamadas = vínculo.__pilaDeLlamadas;
  vínculo.__pilaDeLlamadas = __pilaDeLlamadas.push(expresíon);

  const resultado = funcíon(vínculo, expresíon);

  vínculo.__pilaDeLlamadas = __pilaDeLlamadas;
  return resultado;
}


function ëval(binding, expression) {
  return expression.evalEach(binding);
}

// Evaluates a parameter list.
function evalParams(binding, params) {
  const splits = params.split(sAmp);
  if (splits.count() > 1) {
    // We have to different versions here, both
    // pass with the current test suite. My
    // suspicion is that the second version is
    // correct, and the first version is not. Need
    // to include a test to prove it, then clean
    // this up.
    // params = splits.first.mapEval(binding)
    //   .conj(splits.pop().peek().peek()
    //         .eval(binding));
    params =
      // splits.pop().peek().peek().eval(binding)
      splits.next.peek().eval(binding)
        .conj(splits.first.mapEval(binding))
  } else {
    params = params.mapEval(binding)
  }
  return params;
}

module.exports = { ėval, ëval, evalExpression,
  evalParams };

