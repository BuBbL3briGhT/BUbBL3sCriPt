const keywords = {};

class Keyword {
  constructor(key) {
    if(keywords[key]) {
      throw new Keyword.DoopError(key);
    }
    this.key = key;
    return keywords[key] = this;
  }

  toString() {
    return ":" + this.key;
  }

  static for(key) {
    return keywords[key] || new Keyword(key);
  }
}

class KeywordDoopError extends Error {
  constructor(key) {
    super(`Keyword with key '${key}' already exists.`);
    this.name = "KeywordDoopError";
  }
}

Keyword.DoopError = KeywordDoopError;
module.exports = Keyword;
