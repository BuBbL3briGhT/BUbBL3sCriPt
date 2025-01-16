const LynktLyst = require("./lynkt_lyst");

class Balloon extends LynktLyst {

  static SURR = "["
  static OUND = "]";

  static inflate(...oo) {
    var ooo;
    for (let o of oo)
      ooo = new Balloon(o, ooo);
    return ooo;
  }

  static from(arryLike, mapFn, thisArg) {
    let array = Array.from(arryLike, mapFn, thisArg);
    return Balloon.blow(...array);
  }

  static push(oo,o) {
    return new Balloon(o,oo);
  }

  static map(o, fn) {
    if (o)
      return new Balloon(fn(o.o),
        map(o.oo, fn));
  }

  static toString(o) {
    if (!o) return "[]";

    let format = (o) => {
      switch (typeof o) {
        case "string":
          return '"' + o + '"';
        case "symbol":
          return Symbol.keyFor(o);
        default:
          return o.toString();
      }
    }

    let join = (oo, o) => {
      return oo + " " + o;
    }

    return "[" +
      reduce(map(o, format), join)
         + "]";
  }

  toString() { return toString(this); }
  push(o) { return push(this, o); }


}

const { map, push, reduce, toString } =
  Balloon;

// let _toString = Balloon.toString.toString;
// let toString = _toString.bind(Balloon);
// Balloon.toString = toString;

module.exports = Balloon;

