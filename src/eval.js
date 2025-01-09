
const Bubble = require("./bubble");
const Keyword = require("./keyword");
const parse = require("./parse.js");

function eval(string) {
  let it = parse(string);
  console.log(it.peek().toString());
}

function _eval(binding, expression) {
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


