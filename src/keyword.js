
const keywords = {};

class Keyword {

  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }

  static for(key) {
    return keywords[key] ||
      (keywords[key] = new Keyword(key));
  }

  // Compares 2 Keywords for equality.
  static areEqual(a, b) {
    return a.value === b.value;
  }

  // Compares 2 Keywords for inequality.
  static areNotEqual(a, b) {
    return !Keyword.areEqual(a, b)
  }

}

module.exports = Keyword;
