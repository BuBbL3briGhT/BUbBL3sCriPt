console.log("load fn");
const Symbol = require("./symbol");

class Fn {

  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args;
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
    return invoke(this.bnd, this,
      args && args.invert().map(function(a) {
        return evl(bnd, a);
      }))
  }

  toString() {
    return this.body.push(this.args)
      .push(new Symbol("fn"))
      .toString()
  }

}

console.log("export fn");
module.exports = Fn;
console.log("assemble fn");

const invoke = require("../f/invoke");
const eval = require('../f/eval');
console.log("fn required eval");
const _eval  = eval.eVaL;
console.log(_eval);
