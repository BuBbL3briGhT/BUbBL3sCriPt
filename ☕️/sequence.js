import { List } from "./list.js";

export class Sequence {
  map (fn) {
    return new MapSequence(this, fn);
  }

  [Symbol.iterator] () {
    return this;
  }
}

export class MapSequence extends Sequence {
  constructor (sequence, fn) {
    super();
    this.sequence = sequence;
    this.fn = fn;
  }

  next () {
    const next = this.sequence.next();

    if (next.done) return next;

    return {
      value: this.fn.invoke(List.blow(next.value)),
      done: false
    };
  }
}
