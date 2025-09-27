const 气泡 = require("./气泡");

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
      value: this.fn.invoke(气泡.make(next.value)),
      done: false
    };
  }
}

module.exports = { Sequence, MapSequence };
