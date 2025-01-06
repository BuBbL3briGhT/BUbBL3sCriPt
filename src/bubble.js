
var air;

class Bubble {

  static get air() { return air; }
  static set air(value) {
    switch (Math.trunc(Math.random() * 3)) {
      case 0: throw new Error("You'rE tryiNg to overwrite Bubble.air, soOo i've got 1 question for you. Do you feel lucky...🤠...PuNk?!?");
      case 1: throw new Error("👋 TheSe arE noT the dRoiDs yoU are LooKing for.");
      case 2: throw new Error("http://youtu.be/otCpCn0l4Wo");
    }
  };

  get x() { return false; }
  // get first() { return peek(this); }
  // get rest() { return pop(this); }
  // get next() { return this.oo.o; }
  // get last() { return this.oo ?
  //     this.oo.last : this.o; }

  // Blow a bubble.
  constructor(o, oo) {
    this.o=o;
    this.oo=oo||air;
  }

  // Blow bubbles faster.
  static blow(...ooo) {
    var oo = air;
    if (ooo.length == 0)
      return air;
    else
      ooo = ooo.reverse();
      for (let o of ooo)
        oo  = new Bubble(o, oo);
    return oo;
  }

  // Blow a bunch of bubbles from an
  // Javascript iterable or array-like
  // object.
  //
  // Parameters are passed directly to
  // Array.from and the result is then
  // blown into bubbles.
  static from(arryLike, mapFn, thisArg) {
    let array = Array.from(arryLike, mapFn, thisArg);
    return Bubble.blow(...array);
  }

  static get(o,i) { return skip(o,i).o; }

  static skip(o, count) {
    if (count)
      return skip(o.oo, --count);
    return o;
  }

  static push(o,oo) {
    return new Bubble(oo,o);
  }

  static peek(o) { return o.o; }
  static pop(o) { return o.oo; }

  static count(o) {
    return reduce(o, function(count) {
      return count++;
    }, 0);
  }

  static shift(o) {
    return invert(pop(invert(o)));
  }

  static invert(o) {
    if (o.x) return o;
    return reduce((oo, o) => {
      return push(oo, o)
    }, new Bubble(o.o))
  }

  static conj(o, oo) {
    return oo.reduce(function(oo, o) {
      return oo.push(o);
    }, o);
  }

  static toString(o) {
    if (o.x)
      return "()";

    let format = (o) => {
      switch (typeof o) {
        case "string":
          return '"' + o + '"';
        case "symbol":
          return Symbol.keyFor(o);
        default:
          return toString(o);
      }
    }

    let join = (oo, o) => {
      return o + " " + oo;
    }

    return "(" +
      o.map(format).reduce(join)
         + ")";
  }

  static toArray(o) {
    return reduce((oo, o) => {
      oo.push(o); }, []);
  }

  static map(o, fn) {
    if (o.x)
      return o;
    return new Bubble(fn(o.o),
      map(o.oo, fn));
  }

  static reduce(o, fn, oo) {
    if (o.x)
      return oo;

    if (oo === undefined) {
      oo = o.o;
    } else {
      oo = fn(oo, o.o);
    }

    return reduce(o.oo, fn, oo);
  }

  static each(o, fn) {
    let oo = fn(o.o);
    if (o.oo)
      return each(o.oo, fn);
    return oo;
  }

  //// Members Only ////

  count() { return count(this); }
  conj(oo) { return conj(this, oo); }
  each(fn) { return each(this, fn); }
  get(i) { return get(this, i); }
  invert() { return invert(this); }
  map(fn) { return map(this, fn); }
  peek() { return peek(this); }
  pop() { return pop(this); }
  push(o) { return push(this, o); }
  reduce(fn, memo) {
    return reduce(this, fn, memo); }
  shift() { shift(this); }
  skip(n) { skip(this, n) };
  toString() { return toString(this); }
  toArray() { return toArray(this); }

  *[global.Symbol.iterator]() {
    yield peek(this);
    yield pop(this);
  }

}

const {count, conj, each, get, invert,
  map, peek, pop, push, reduce, shift,
  skip, toString, toArray } = Bubble

class Air extends Bubble {
  get x() { return true; }
}

air = new Air()

module.exports = Bubble;
