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
    return this.invoke(
      args && args.map(function(a) {
        return _eval(bnd, a);
      }));
  }

  // orginalinvoke(bnd, fn, args) {
  //   var bnd = Object.create(bnd);
  //   // var q = map(glider, fn.args, args)

  //   var x, y;
  //   x = fn.args;
  //   y = args;
  //   while (x) {
  //     if (x.first == '&') {
  //       x = x.rest;
  //       bnd[x.first] = y
  //       x = null;                                    y = null;
  //       break;
  //     }
  //     bnd[x.first] = y && y.first;
  //     x = x.rest;
  //     y = y && y.rest;
  //   }

  //   return _eval(bnd, fn);
  // }

  invoke(args) { //new
    // console.log("expand (args):", args.toString());
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
    // console.log("bnd", bnd);
    // console.log("body", this.body);
    // console.log("body", this.body.toString());
    // return _eval(bnd, this.body);

    // console.log(this.body.map((xpr) => _eval(bnd, xpr)).toString(), 123);
    // return this.body.map((xpr) => _eval(bnd, xpr));
    return _eval(bnd, this);
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
