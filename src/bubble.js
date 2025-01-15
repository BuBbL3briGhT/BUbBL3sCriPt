const LynktLyst = require("./lynkt_lyst");



class Bubble extends LynktLyst {

  // Blow bubbles faster.
  static blow(...oo) {
    return _blow(oo);
  }

  // Blow a bunch of lynktLysts from an
  // Javascript iterable or array-like
  // object.
  //
  // Parameters are passed directly to
  // Array.from and the result is then
  // blown into lynktLysts.
  static from(arryLike, mapFn, thisArg) {
    let array = Array.from(arryLike, mapFn, thisArg);
    return Bubble.blow(...array);
  }

  static push(oo,o) {
    return new Bubble(o,oo);
  }

  static toString(o) {
    if (!o) return "()";

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

    return "(" +
      reduce(map(o, format), join)
         + ")";
  }

  toString() { return toString(this); }
  push(o) { return push(this, o); }

}

const { map, push, reduce, toString } =
  Bubble;


function _blow(a, bubble) {
  if (a.length < 1) return bubble;
  return _blow(a, new Bubble(a.pop(), bubble));
}

module.exports = Bubble;
