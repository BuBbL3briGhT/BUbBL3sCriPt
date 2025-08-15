const LazyList = require("./lazy_list");
const List = require("./list");
const TOK_NUMBER  = 'N';
const TOK_SYMBOL  = 'Y';

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
    while (true) {
      if (this.tortuga["isEmpty?"])
        return;

      let char = this.tortuga.peek();

      switch (char) {
        case " ":
          break;

        case "(":
        case ")":
          const token = this.createToken(char, char);
          this.tortuga = this.tortuga.pop()
          return token;

        case Char.isNum(char):
          return this.tokenizeNumber();

        default:
          return this.tokenizeSymbol();
      }

      this.tortuga = this.tortuga.pop();
    }
  }

  tokenizeNumber () {
    const matcher = new NumberMatcher(this.tortuga);
    const _value = matcher.match;
    this.tortuga = matcher.tortuga;

    const value = Number(_value);
    return this.createToken(TOK_NUMBER, value);
  }

  tokenizeSymbol () {
    const matcher = new SymbolMatcher(this.tortuga);
    const value = matcher.match;
    this.tortuga = matcher.tortuga;
    // this.tortuga = this.tortuga.skip(value.length);

    return this.createToken(TOK_SYMBOL, value);
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

  constructor (tortuga) {
    this.tortuga = tortuga;
  }

  get match() {
    let value = this.matchWholeNumber();

    if ( this.tortuga.peek() === "." ) {
      const deci = this.tortuga.pop()
      const char = deci.peek();

      if ( Char.isNum(char) ) {
        this.tortuga = deci;
        value += "." + this.matchWholeNumber()
      }
    }

    return value;
  }

  matchWholeNumber () {
    let value = "";
    let char = this.tortuga.peek()

    while (Char.isNum(char)) {
      value += char;
      this.tortuga = this.tortuga.pop();
      char = this.tortuga.peek();
    }

    return value;
  }
}

// Symbol Delimiters
const symDelims = List.make(' ', '\n', '\r');

// SymbolMatcher: Matches ^<symbol> from
// tortuga.
class SymbolMatcher {

  constructor (tortuga) {
    this.tortuga = tortuga;
  }

  get match() {
    if (this.tortuga["isEmpty?"])
      // Cannot match a symbol on an empty list.
      throw Error("Tortuga is empty.");

    let char = this.tortuga.peek();

    if (symDelims["includes?"](char))
      throw Error("First character is a " +
        "symbol delimeter. (" + char + ")");

    let result = char;

    this.tortuga = this.tortuga.pop();

    if (this.tortuga["isEmpty?"])
      return result;

    char = this.tortuga.peek();

    while (char) {
      if (symDelims["includes?"](char))
        return result;
      else
        result += char;

      this.tortuga = this.tortuga.pop();

      if (this.tortuga["isEmpty?"])
        return result;

      char = this.tortuga.peek();
    }

    return result;
  }
}

class Char {
  static isNum(char) {
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
        return char;
    }
  }
}


module.exports = Tökenizer;
