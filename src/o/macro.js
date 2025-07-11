
class Macro {
  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args;
    this.body = body;
  }

  call(bnd, args) {
    return _eval(this.bnd, invoke(bnd, this, args));
  }

  expand(bnd, args) {
    return invoke(bnd, this, args);
  }

  toString() {
    return "(macro " + this.args.toString() +
      this.body.toString() + ")";
  }
}

module.exports = Macro;

const invoke = require("../f/invoke");
const eval = require('../f/eval');
const _eval  = eval.eVaL;
console.log(eval);
console.log(_eval);
