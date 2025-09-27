const Bubble = require("./bubble");

class Sequence {
  map (fn) {
    return new MapSequence(this, fn);
  }

  [Symbol.iterator] () {
    return this;
  }
}

class MapSequence extends Sequence {
  constructor (sequence, fn) {
    super();
    this.sequence = sequence;
    this.fn = fn;
  }

  next () {
    const next = this.sequence.next();

    if (next.done) return next;

    return {
      value: this.fn.invoke(Bubble.make(next.value)),
      done: false
    };
  }
}

module.exports = { Sequence, MapSequence };
