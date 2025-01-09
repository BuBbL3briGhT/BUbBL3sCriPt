
const Bubble = require("./bubble");
const Keyword = require("./keyword");

function eval(binding, expression) {
  console.log(binding, expression);

  // switch (exp && exp.constructor) {
  //   case Symbol:
  //     return exp.resolve(bnd)
  //   case Quoted:
  //     return exp.unquote();
  //   default:
  //     return exp;
  // }
};

module.exports = eval;


