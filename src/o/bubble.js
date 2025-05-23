
class Bubble {
  constructor(o) {
    this.o = o;
  }

  pop() {
    return this.o;
  }

  toString() {
    return "°" + this.o;
  }

  inspect() {
    return "°" + this.o.inspect;
  }
}

module.exports = Bubble;
