const List = require("./list");

class Sequence {
  map (funk) {
    return new MapSequence(this, funk);
  }

  [Symbol.iterator] () {
    return this;
  }
}

class MapSequence extends Sequence {
  constructor (sequence, funk) {
    super();
    this.sequence = sequence;
    this.funk = funk;
  }

  next () {
    const next = this.sequence.next();

    if (next.done) return next;

    return {
      value: this.funk.invoke(List.blow(next.value)),
      done: false
    };
  }
}

module.exports = { Sequence, MapSequence };
