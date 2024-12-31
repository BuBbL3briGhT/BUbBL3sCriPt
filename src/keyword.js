// const PRIVATE_KEY = new Object();
const keywords = {};


class Keyword {

  // constructor(privateKey, key) {
  //   if (privateKey !== PRIVATE_KEY) {
  //     throw Error;
  //   }
  //   this.key = key;
  // }

  constructor(key) {
    if(keywords[key]) {
      // throw new DuplicateKeywordError(`Keyword with key '${key}' already exists.`);
      throw new Keyword.DoopError(key);
    }
    this.key = key;
    return keywords[key] = this;
  }

  toString() {
    return this.key;
  }

  static for(key) {
    return keywords[key] || new Keyword(key);
  }

  // // Compares 2 Keywords for equality.
  // static areEqual(a, b) {
  //   return a.value === b.value;
  // }

  // // Compares 2 Keywords for inequality.
  // static areNotEqual(a, b) {
  //   return !Keyword.areEqual(a, b)
  // }

}

class KeywordDoopError extends Error {
  constructor(key) {
    super(`Keyword with key '${key}' already exists.`);
    this.name = "KeywordDoopError";
  }
}
Keyword.DoopError = KeywordDoopError;

module.exports = Keyword;
