const LazyList = require("./lazy_list");
const TOK_NUMBER  = 'N';

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
    const _value = this.tortuga.peek();
    const value = Number(_value);
    this.tortuga = this.tortuga.pop();
    return this.createToken(TOK_NUMBER, value);
  }

  createToken(type, value) {
    return { type, value, line: 1, column: 1 };
  }

  [Symbol.iterator]() {
    return this;
  }

}

module.exports = Tökenizer;
