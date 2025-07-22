// console.log("load fn");
const Symbol = require("./symbol");

class Fn {

  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args.toList();
    this.body = body;
  }

  // call(bnd, args) {
  //   const evl = require("../f/eval").eVaL;
  //   return invoke(this.bnd, this,
  //     args && args.map(function(a) {
  //       return evl(bnd, a);
  //     }))
  // }

  call(bnd, args) {
    bnd = Object.create(bnd);

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

    return _eval(bnd, this);
  }

  invoke(args) {
    return this.call(this.bnd, args);
  }

  toString() {
    return this.body.push(this.args)
      .push(new Symbol("fn"))
      .toString()
  }

}

// console.log("export fn");
module.exports = Fn;
// console.log("assemble fn");

const eval = require('../f/eval');
// console.log("fn required eval");
const _eval  = eval.eVaL;
// console.log(_eval);
