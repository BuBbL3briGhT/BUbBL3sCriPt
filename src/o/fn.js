const Symbol = require("./symbol");

class Fn {

  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args.toList();
    this.body = body;
  }

  invoke(args) {
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

    // return this.body.each(xpr => _eval(bnd, xpr));
    return this.body.evalEach(bnd);
  }

  toString() {
    return this.body.push(this.args)
      .push(new Symbol("fn"))
      .toString()
  }

}

module.exports = Fn;

const eval = require('../f/eval');
const _eval  = eval.eVaL;
