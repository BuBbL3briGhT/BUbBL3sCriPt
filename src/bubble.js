
var air;

class Bubble {

  static get air() { return air; }
  // static set air(value) {
  //   switch (Math.trunc(Math.random() * 3)) {
  //     case 0: throw new Error("You'rE tryiNg to overwrite Bubble.air, soOo i've got 1 question for you. Do you feel lucky...🤠...PuNk?!?");
  //     case 1: throw new Error("👋 TheSe arE noT the dRoiDs yoU are LooKing for.");
  //     case 2: throw new Error("http://youtu.be/otCpCn0l4Wo");
  //   }
  // };

  get x() { return false; }
  // get first() { return peek(this); }
  // get rest() { return pop(this); }
  // get next() { return this.oo.o; }
  // get last() { return this.oo ?
  //     this.oo.last : this.o; }

  // Blow a bubble.
  constructor(o, oo) {
    this.o=o;
    this.oo=oo;
  }

  // Blow bubbles faster.
  static blow(...ooo) {
    var oo = air;
    if (ooo.length == 0)
      return air;
    else
    for (let o of ooo)
      oo  = new Bubble(o, oo);
    return oo;
  }

  // Blow bubbles faster.
  static blow(...ooo) {
    var oo;
    ooo = ooo.reverse();
    for (let o of ooo)
      oo  = new Bubble(o, oo);
    return oo;
  }

  // Blow bubbles faster.
  static blow(...oo) {
    var ooo;
    oo = oo.reverse();
    for (let o of oo)
      ooo  = new Bubble(o, ooo);
    return ooo;
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

  static get(o,i) { return peek(skip(o,i)); }

  static skip(o, count) {
    if (count)
      return skip(pop(o), --count);
    return o;
  }

  static push(oo,o) {
    return new Bubble(o,oo);
  }

  static peek(o) { return o.o; }
  static pop(o) { return o.oo; }

  static count(o) {
    return reduce(o, (count) => {
      return count++;
    }, 0);
  }

  static shift(o) {
    return invert(pop(invert(o)));
  }

  static invert(o) {
    if (o)
      return reduce(pop(o), (oo, o) => {
        return push(oo, o)
      }, new Bubble(peek(o)));
  }

  static conj(o, oo) {
    return oo.reduce(function(oo, o) {
      return oo.push(o);
    }, o);
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

  static toArray(o) {
    return reduce((oo, o) => {
      oo.push(o); }, []);
  }

  static map(o, fn) {
    if (o)
      return new Bubble(fn(o.o),
        map(o.oo, fn));
  }

  static reduce(o, fn, memo) {
    if (o) {
      let oo = pop(o);
      if (oo)
        if (memo)
          return reduce(oo, fn,
            fn(memo, peek(o)))
        else
          return reduce(oo, fn, peek(o));
      else if(memo)
        return fn(memo, peek(o));
      else
        return peek(o);
    } else
      return memo;
  }

  static each(o, fn) {
    let oo = fn(peek(o));
    if (pop(o))
      return each(pop(o), fn);
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
