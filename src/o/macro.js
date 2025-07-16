// console.log("load macro");

class Macro {
  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args;
    this.body = body;
  }

  call(bnd, args) {
    console.log("Macro called", args);
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

// console.log("export macro");
module.exports = Macro;
// console.log("assemble macro");

const invoke = require("../f/invoke");
const eval = require('../f/eval');
const _eval  = eval.eVaL;
