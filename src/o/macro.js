class Macro {
  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args;
    this.body = body;
  }

  call(bnd, args) {
    return evl(this.bnd, invoke(bnd, this, args));
  }

  expand(bnd, args) {
    return invoke(bnd, this, args);
  }

  toString() {
    return "(macro " + this.args.toString() +
      this.body.toString() + ")";
  }
}

const invoke = require("../f/invoke");

module.exports = Macro;

const eval = require('../f/eval');
const evl  = eval.eVaL;

