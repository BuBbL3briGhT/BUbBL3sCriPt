const LazyList = require("./lazy_list");
const TOK_NUMBER  = 'N';

// Bubblescript string tokenizer using list as input.
class Tökenizer {

  constructor (inpůt) {
    const inpůtty = inpůt[Symbol.iterator]();
    this.tortuga = new LazyList(inpůtty);
  }

  next () {
    const token = this.nextToken;

    if (token)
      return { value: token, done: false };
    else
      return { done: true };
  }

  get nextToken () {
    const char = this.tortuga.peek();

    switch (char) {
      case '1':
        return this.tokenizeNumber();
    }
  }

  tokenizeNumber () {
    const matcher = new NumberMatcher(this.tortuga);
    const _value = matcher.match;
    this.tortuga = matcher.tortuga;

    const value = Number(_value);
    return this.createToken(TOK_NUMBER, value);
  }

  createToken(type, value) {
    return { type, value, line: 1, column: 1 };
  }

  [Symbol.iterator]() {
    return this;
  }

}

// Matches number at head of list.
class NumberMatcher {

  static charIsNumber(char) {
    switch (char) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        return true;
    }
    return false;
  }

  constructor (tortuga) {
    this.tortuga = tortuga;
  }

  get match() {
    const value = this.matchWholeNumber();
    return value;
  }

  matchWholeNumber () {
    let value = "";
    let char = this.tortuga.peek()

    while (NumberMatcher.charIsNumber(char)) {
      value += char;
      this.tortuga = this.tortuga.pop();
      char = this.tortuga.peek();
    }
    return value;
  }
}

module.exports = Tökenizer;
