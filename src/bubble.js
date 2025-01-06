
var air;

class Bubble {

  // Blow a bubble.
  constructor(breath, bubble) {
    this.breath = breath;
    this.bubble = bubble || Bubble.air;
  }

  // Blow bubbles faster.
  static blow(...breaths) {
    var bubble = Bubble.air;
    if (breaths.length == 0)
      return this.air;
    else
      breaths = breaths.reverse();
      for (let breath of breaths)
        bubble = new Bubble(breath, bubble);
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

  push(breath) {
    return new Bubble(breath, this);
  }

  peek() {
    return this.breath;
  }
  pop() {
    return this.bubble;
  }

  static get air() { return air; }

  static set air(value) {
    switch (Math.trunc(Math.random() * 3)) {
      case 0: throw new Error("You'rE tryiNg to overwrite Bubble.air, soOo i've got 1 question for you. Do you feel lucky...🤠...PuNk?!?");
      case 1: throw new Error("👋 TheSe arE noT the dRoiDs yoU are LooKing for.");
      case 2: throw new Error("http://youtu.be/otCpCn0l4Wo");
    }
  };

  get isAir() { return false; }

  get first() {
    return this.breath;
  }
  get rest() {
    return this.bubble;
  }
  get next() {
    return this.bubble.breath;
  }
  get last() {
    return this.bubble ? this.bubble.last : this.breath;
  }

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
    bubble = new Bubble(this.breath);
    bubble = this.bubble.reduce((bubble, breath) => {
      return bubble.push(breath);
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

    let format = (breath) => {
      switch (typeof breath) {
        case "string":
          return '"' + breath + '"';
        case "symbol":
          return Symbol.keyFor(breath);
        default:
          return breath.toString();
      }
    }

    let join = (memo, breath) => {
      return breath + " " + memo;
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
      return [this.breath].concat(this.bubble.toArray());
    } else {
      return [this.breath];
    }
  }

  map(fn) {
    if (this.isAir)
      return this;
    return new Bubble(fn(this.breath), this.bubble.map(fn));
  }

  reduce(fn, memo) {
    if (this.isAir)
      return memo;

    if (memo === undefined) {
      memo = this.breath;
    } else {
      memo = fn(memo, this.breath);
    }

    return this.bubble.reduce(fn, memo);
  }

  each(fn) {
    var result = fn(this.breath);
    if (this.bubble)
      return this.bubble.each(fn);
    return result;
  }

  get(index) {
    if (index)
      return this.bubble.get(--index);
    return this.breath;
  }

  *[global.Symbol.iterator]() {
    yield this.peek();
    yield this.pop();
  }

}

class Air extends Bubble {
  get isAir() { return true; }
}

air = new Air()

module.exports = Bubble;
