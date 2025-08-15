const LazyList = require("./lazy_list");
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
      if (this.tortuga.isEmpty)
        return;

      let char = this.tortuga.peek();

      switch (char) {
        case " ":
          break;

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
// const symDelim = /[ \n\r\t\\l]/;
const symDelim = /[ \n\r]/;

// SymbolMatcher: Matches ^<symbol> from
// tortuga.
//
// Design Note: The purpose of the Symbol
// Matcher is to match a symbol agaist the head
// of a List.  This is a concession of having a
// full-blown regex matcher, which would be much
// more involved to implement (a bug ridden
// initially). The built-in regex mechanisms
// which Javascript provides upfront are
// terrific, but only work upon strings. We
// don't have a string, because we are matching
// against a list which is lazy, character by
// character.  if we were to render a string, we
// would have to choose a good enough length,
// infinite length would involved rendering the
// entire string, which is what we want to
// avoid.
//
// The functionality which the symbol matcher
// provides is a design requirement for the
// tokenizer and is current defined within it's
// module.
//
// The symbol matcher is picky about what it
// will match against. It will not match no
// symbol on an empty list. Being permissive, it
// we could choose to return no match and do
// nothing with the list, but this can lead to a
// bitch of a time, because if whoever is
// calling it should have knowledge that at
// least one character of a symbol exists at tge
// head of the tortuga list. That scenario is
// the trigger to use the symbol matcher, and if
// it doesn't exist then more than likely it
// represent a bug in the invoking part of the
// invoking part of the code (whoever is using
// symbolmatcher), it could also represent a bug
// in our logically deduction, but less likely
// as this has been thought through a number of
// times. SymbolMatcher does the checks upfront
// to make sure these conditions are satisfied,
// and then finishes its's matching logic and
// returns the symbol value and incremented
// tortuga list.
//
// Since it raises exception in these
// exceptional circumstances, it will allow us
// to more easily identify errors in the calling
// code or our deduduced logical assumption by
// halting the execution of the program and
// providing a resionably helpful error message
// and and call stack.
//
// Naturally, the design isnt yet perfect, our
// current implementation is a sketch that we
// would like to refactor. We like to capture it
// as it is, especially considering the tests we
// are targeting right now are passing, with a
// commit in version control before doing so, to
// avoid spinning our wheels, and to keep us
// moving forward.
//
// We already kindof iterated on this code a
// little bit, and avoid making some extranious
// commits, but we don't mind being commit heavy
// so we can catch a lot of the inbetween states
// of the code development. Doing so requires
// less thinking from us because you never know
// when you strike gold, especially if you are
// not paying attention, and you might be
// foxusing on one thing, and trying different
// things, just trying them out. bla bla bla
//
//
class SymbolMatcher {

  // static symbolDelimiters = List(' ', '\n', '\r', '\t', '\l');
  // static symbolDelimers = /[ \n\r\t\l]/
  // static reject = /[ \n\r\t\l]/; // Symbol Delimiters

  constructor (tortuga) {
    this.tortuga = tortuga;
  }

  get match() {
    if (this.tortuga.isEmpty)
      // Cannot match a symbol on an empty list.
      throw Error("Tortuga is empty.");

    let char = this.tortuga.peek();

    if (symDelim.test(char))
      throw Error("First character is a " +
        "symbol delimeter. (" + char + ")");

    let result = char;

    this.tortuga = this.tortuga.pop();

    if (this.tortuga.isEmpty)
      return result;

    char = this.tortuga.peek();

    while (char) {
      if (symDelim.test(char))
        return result;
      else
        result += char;

      this.tortuga = this.tortuga.pop();

      if (this.tortuga.isEmpty)
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
