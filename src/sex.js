const assert = require("assert");

const TOK_KEYWORD = 'K',
      TOK_NUMBER  = 'N',
      TOK_STRiNG  = 'S',
      TOK_SYMBOL  = 'Y',
      TOK_TRUE    = 'T',
      TOK_FALSE   = 'F';

// const string = "love";
const string = "(love)";

// function* tokenize(string) {
//   let line = 1;
//   let column = 1;

//   yield {
//     line: 1,
//     columm: 1,
//     type: 1,
//     value: ""
//   }

// class TokensIterator {
class Tokenator {
  constructor(string, opts={}) {
    this.hare = string.length;
    this.turtle = 0;
    this.string = string;
    this.line = 1;
    this.column = 1;
    this.file = opts.file;
  }

  next() {
    if (this.turtle < this.hare) {
      const char = this.string[this.turtle++];
      switch (char) {
        case '(':
          return { value: this.createToken(char, char) };
          break;
        default:
          if (/[^\s()[\]{}:"#'.]/.test(char)) { // Ensure it's a valid start for a symbol
            return { value: this.tokenizeSymbol() };
          }
          throw new Error(`Unexpected character: '${char}' at ${this.line}:${this.column}`);
      }
    }
    return { done: true };
  }

  // Advances turtle along string by n characters, updating line and column.
  advance(n = 1) {
    for (let i = 0; i < n; i++) {
      if (this.string[i+this.turtle] === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
    }
    this.turtle = this.turtle+n;
  }

  tokenizeSymbol () {
    let _string = this.string.substr(this.turtle-1, 32);
    let matchResult = _string.match(/^([^\s()[\]]*)/);
    // console.log(matchResult);
    if (matchResult && matchResult[0].length > 0) { // Ensure it matches a non-empty symbol
      this.advance(matchResult[0].length);
      return this.createToken(TOK_SYMBOL, matchResult[0]);
    }

    throw new Error(`Invalid symbol starting with '${currentString[0]}' at ${line}:${column}`);
  }

  createToken(type, value) {
    return { type, value, line: this.line, column: this.column, file: this.file };
  }

  [Symbol.iterator]() {
    return this;
  }
}

const tokenator = new Tokenator(string, { file: "imaginary" });
// console.log(tokenator.next());
for (const token of tokenator) {
  console.log(token);
}

process.exit(0);

// class Tokens {
//   constructor(string) {
//     this.string
//   }
// }

class Tokenizer {

  *tokenize(string) {
      var turtle = 0;
    const hare   = string.length;
      var line   = 1;
      var column = 1;

    while(turtle < hare) {
      const char = string[turtle++];
      switch (char) {
        case '(':
          yield char;
      }
    }
  }

  // *tokenize() {
  //   yield {
  //     line: 1,
  //     columm: 1,
  //     type: 1,
  //     value: ""
  //   };
  //   yield 2;
  //   yield this.string;
  // }
}

const tokenizer = new Tokenizer();
const tokens = tokenizer.tokenize(string)
for(const token of tokens) {
  console.log(token);
}


// const tokens = tokenize("love");
// for(const token of tokens) {
//   console.log(token);
// }


// describe("tokenize", function () {
//   it(""
// });

