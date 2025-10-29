const keywords = Object.create(null);

class PalabraClave {
  constructor(key) {
    if(keywords[key]) {
      throw new PalabraClave.DoopError(key);
    }
    this.key = key;
    return keywords[key] = this;
  }

  toString() {
    return ":" + this.key;
  }

  static for(key) {
    return keywords[key] || new PalabraClave(key);
  }
}

class KeywordDoopError extends Error {
  constructor(key) {
    super(`PalabraClave with key '${key}' already exists.`);
    this.name = "KeywordDoopError";
  }
}

PalabraClave.DoopError = KeywordDoopError;

module.exports = PalabraClave;
