
function invoke(bnd, fn, args) {
  const evl = require("../f/eval").eVaL;

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

  return evl(bnd, fn);
}

module.exports = invoke;
