// console.log("load macro");

class Macro {
  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args;
    this.body = body;
  }

  // call(bnd, args) {
  //   console.log("Macro called", args.toString());
  //   console.log(invoke(bnd, this, args).toString());
  //   return _eval(this.bnd, invoke(bnd, this, args));
  // }

  call(bnd, args) {
    // console.log("Macro called", args.toString());
    // console.log("expanded", this.expand(args).toString());
    // console.log("args", args.toString());
    // console.log("expanded", this.expand(args));
    return _eval(bnd, this.expand(args));
  }

  expand(args) {
    // console.log("expand (args):", args.toString());
    let bnd = Object.create(this.bnd);

    var x, y;
    x = this.args.invert();
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
    // console.log("bnd", bnd);
    // console.log("body", this.body);
    // console.log("body", this.body.toString());
    // return _eval(bnd, this.body);

    // console.log(this.body.map((xpr) => _eval(bnd, xpr)).toString(), 123);
    return this.body.map((xpr) => _eval(bnd, xpr));
  }

  // expand(bnd, args) {
  //   return invoke(bnd, this, args);
  // }

  toString() {
    return "(macro " + this.args.toString() +
      this.body.toString() + ")";
  }
}

module.exports = Macro;

const invoke = require("../f/invoke");
const eval = require('../f/eval');
const _eval  = eval.eVaL;
