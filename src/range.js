
class Range {

  constructor (startend, end, step) {
    if (!end) {
      this.start = 0;
      this.end = startend || Infinity;
    } else {
      this.start = startend;
      this.end = end;
    }
    this.step = step || 1;
  }

  next () {
    if (this.i >= this.end)
      return { done: true }

    const value = this.i;
    this.i += this.step;
    return { value, done: false };
  }

  [Symbol.iterator] () {
    return this;
  }
}
