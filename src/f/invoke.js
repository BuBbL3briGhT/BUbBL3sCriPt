// console.log("load invoke");

function invoke(bnd, fn, args) {
  var bnd = Object.create(bnd);
  // var q = map(glider, fn.args, args)

  var x, y;
  x = fn.args;
  y = args;
  while (x) {
    if (x.first == '&') {
      x = x.rest;
      bnd[x.first] = y
      x = null;                                    y = null;
      break;
    }
    bnd[x.first] = y && y.first;
    x = x.rest;
    y = y && y.rest;
  }

  return _eval(bnd, fn);
}

// console.log("export invoke");
module.exports = invoke;
// console.log("assemble invoke");

const eval = require('../f/eval');
const _eval  = eval.eVaL;
