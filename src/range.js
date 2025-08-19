
class Range {

  constructor (endstart, end, step=1) {
    this.step = step;
    if (end) {
      this.i = endstart;
      this.end = end;
    } else {
      this.i = 0;
      this.end = endstart || Infinity;
    }
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

module.exports = Range;
