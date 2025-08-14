

class Tökenizer {

  next () {
    return { done: true };
  }

  [Symbol.iterator]() {
    return this;
  }

}

module.exports = Tökenizer;
