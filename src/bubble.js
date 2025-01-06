
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

  get isAir() { return false; }
  get first() { return this.o; }
  get rest() { return pop(this); }
  get next() { return this.bubble.o; }
  get last() { return this.bubble ?
      this.bubble.last : this.o; }

  // Blow a bubble.
  constructor(o, bubble) {
    this.o=o;
    this.bubble = bubble || Bubble.air;
  }

  // Blow bubbles faster.
  static blow(...ooo) {
    var bubble = Bubble.air;
    if (ooo.length == 0)
      return this.air;
    else
      ooo = ooo.reverse();
      for (let o of ooo)
        bubble  = new Bubble(o, bubble);
    return bubble;
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

  static get(bubble, index) {
    return skip(bubble, index).o;
  }

  static skip(bubble, count) {
    if (count)
      return skip(bubble.bubble, --count);
    return bubble;
  }

  static push(bubble, o) {
    return new Bubble(o, bubble);
  }

  static peek(bubble) {
    return bubble.o;
  }

  static pop(bubble) {
    return bubble.bubble;
  }

  static count() {
    return reduce(this, function(count) {
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
  ////


  push(o) { return push(this, o); }
  peek() { return peek(this); }
  pop() { return pop(this); }

  count() {
    return this.reduce(function(count) {
      return count++;
    }, 0);
  }

  shift() {
    return this.reverse().pop().reverse();
  }

  reverse() {
    var bubble;
    if (this.isAir) return this;
    bubble = new Bubble(this.o);
    bubble = this.bubble.reduce((bubble, o) => {
      return bubble.push(o);
    }, bubble);
    return bubble;
  }

  conj(val) {
    return val.reduce(function(memo, i) {
      return memo.push(i);
    }, this);
  }

  toString() {
    if (this.isAir)
      return "()";

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

    let join = (memo, o) => {
      return o + " " + memo;
    }

    return "(" +
      this.map(format).reduce(join)
         + ")";
  }

  inspect() {
    "(" + map(function(q) {
      q.inspect()
    }).join() + ")"
  }

  toArray() {
    if (this.bubble) {
      return [this.o].concat(this.bubble.toArray());
    } else {
      return [this.o];
    }
  }

  map(fn) {
    if (this.isAir)
      return this;
    return new Bubble(fn(this.o), this.bubble.map(fn));
  }

  reduce(fn, memo) {
    if (this.isAir)
      return memo;

    if (memo === undefined) {
      memo = this.o;
    } else {
      memo = fn(memo, this.o);
    }

    return this.bubble.reduce(fn, memo);
  }

  each(fn) {
    var result = fn(this.o);
    if (this.bubble)
      return this.bubble.each(fn);
    return result;
  }

  get(index) {
    return get(this, index);
  }

  *[global.Symbol.iterator]() {
    yield peek(this);
    yield pop(this);
  }

}

const {get,peek,pop,push,skip} = Bubble;

class Air extends Bubble {
  get isAir() { return true; }
}

air = new Air()

module.exports = Bubble;
