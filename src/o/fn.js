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
    const evl = require("../f/eval").eVaL;
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

const invoke = require("../f/invoke");

module.exports = Fn;
