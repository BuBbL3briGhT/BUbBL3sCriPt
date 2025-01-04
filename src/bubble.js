
var emptyBubble;

class Bubble  {

  // Blow a bubble.
  constructor(breath, bubble) {
    this.breath = breath;
    this.bubble = bubble || Bubble.air;
  }

  // Blow bubbles faster.
  static blow(...breaths) {
    var bubble = Bubble.air;
    if (items.length == 0)
      return this.emptyBubble;
    else
      for (breath of breaths)
        bubble = new Bubble(breath);
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
      case 0: throw new Error("You'rE tryiNg to overwrite Bubble.emptyBubble, soOo i've got 1 question for you. Do you feel lucky...🤠...PuNk?!?");
      case 1: throw new Error("👋 TheSe arE noT the dRoiDs yoU are LooKing for.");
      case 2: throw new Error("http://youtu.be/otCpCn0l4Wo");
    }
  };

  get isEmpty() { return false; }

  get first() {
    return this.head;
  }
  get rest() {
    return this.tail;
  }
  get next() {
    return this.tail.head;
  }
  get last() {
    return this.tail ? this.tail.last : this.head;
  }

  count() {
    return this.reduce(function(memo, i) {
      return memo + 1;
    }, 0);
  }

  shift() {
    return this.reverse().pop().reverse();
  }

  reverse() {
    var bubble;

    if (this.isEmpty) return this;

    bubble = new Bubble(this.head);

    bubble = this.tail.reduce((memo, i) => {
      return memo.push(i);
    }, bubble);
    return bubble;
  }

  conj(val) {
    return val.reduce(function(memo, i) {
      return memo.push(i);
    }, this);
  }

  toString() {
    if (this.isEmpty)
      return "()";

    let format = (item) => {
      switch (typeof item) {
        case "string":
          return '"' + item + '"';
        case "symbol":
          return Symbol.keyFor(item);
        default:
          return item.toString();
      }
    }

    let join = (memo, item) => {
      return item + " " + memo;
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
    if (this.tail) {
      return [this.head].concat(this.tail.toArray());
    } else {
      return [this.head];
    }
  }

  map(fn) {
    if (this.isEmpty)
      return this;
    return new Bubble(fn(this.head), this.tail.map(fn));
  }

  reduce(fn, memo) {
    if (this.isEmpty)
      return memo;

    if (memo === undefined) {
      memo = this.head;
    } else {
      memo = fn(memo, this.head);
    }

    return this.tail.reduce(fn, memo);
  }

  each(fn) {
    var result = fn(this.head);
    if (this.tail)
      return this.tail.each(fn);
    return result;
  }

  *[global.Symbol.iterator]() {
    yield this.peek();
    yield this.pop();
  }

}

class EmptyBubble extends Bubble {
  get isEmpty() { return true; }
}

emptyBubble = new EmptyBubble()

module.exports = Bubble;
