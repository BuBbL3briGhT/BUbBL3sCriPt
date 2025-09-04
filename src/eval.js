const List = require("./list");
const Ṣymbol = require("./symbol");
const { parse } = require("./parse");
const events = require("./events");

// const sAmp = Ṣymbol.for("&");

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

module.exports = { ėval, ëval, evalExpression };

// function memoize(object, property, fn) {
//   Object.defineProperty(object, property, {
//     get: function () {
//       const value = fn();
//       Object.defineProperty(object, property, {
//         value
//       });
//       return value;
//     },
//     configurable: true
//   });
// }

// memoize(this, "rootBinding",
//   () => require("./root_binding"));

