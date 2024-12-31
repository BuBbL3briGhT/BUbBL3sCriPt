
class Keyword {

  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }

  static areEqual(a, b) {
    return a.value === b.value;
  }

  static areNotEqual(a, b) {
    return !Keyword.areEqual(a, b)
  }
}

module.exports = Keyword;
