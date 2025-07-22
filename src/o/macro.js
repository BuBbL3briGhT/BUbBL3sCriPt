// console.log("load macro");

class Macro {
  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args.toList();
    this.body = body;
  }

  // call(bnd, args) {
  //   return this.expand(args).map((xpr) => _eval(bnd, xpr));
  // }

  expand(args) {
    let bnd = Object.create(this.bnd);

    var x, y;
    x = this.args;
    y = args;
    while (!x.isEmpty) {
      if (x.first == '&') {
        x = x.rest;
        bnd[x.first] = y
        x = null;
        y = null;
        break;
      }
      bnd[x.first] = y && y.first;
      x = x.rest;
      y = y && y.rest;
    }
    return this.body.map((xpr) => _eval(bnd, xpr));
  }

  toString() {
    return "(macro " + this.args.toString() +
      this.body.toString() + ")";
  }
}

module.exports = Macro;

const eval = require('../f/eval');
const _eval  = eval.eVaL;
