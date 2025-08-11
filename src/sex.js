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


// class Tokenizer {
//   *tokenize(string) {
//     const tokenizer = Object.create(this);
//     tokenizer.string = string;
//     while(tokenizer.tortuga < tokenizer.hare) {
//       yield tokenizer.nextToken();
//     }
//   }
// }

// class TokensIterator {
class Tokenizer {
  constructor(string, opts={}) {
    this.string = string;
    this.hare = string.length;
    this.tortuga = 0;
    this.line = 1;
    this.column = 1;
    this.filePath = opts.filePath;
  }

  next() {

    let token;

    if (this.tortuga < this.hare) {

      const char = this.string[this.tortuga];

      switch (char) {
        case '(':
        case ')':
          token = this.createToken(char, char);
          this.advance();
          break;
        case ':':
          token = this.tokenizeKeyword();
          break;
        default:
          if (/\d/.test(char)) {
            token = this.tokenizeNumber();
          } else if (/[^\s()[\]{}:"#'.]/.test(char)) { // Ensure it's a valid start for a symbol
            token = this.tokenizeSymbol();
          } else {
            throw new Error(`Unexpected character: '${char}' at ${this.line}:${this.column}`);
          }
      }
    }

    return { value: token, done: !token };
  }

  // Advances turtle along string by n characters, updating line and column.
  advance(n = 1) {
    for (let i = 0; i < n; i++) {
      if (this.string[this.tortuga] === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
    }
    this.tortuga += n;
  }

  // Returns a sub-string of this.string
  // beginning at the current tortuga position
  // and continuing for 64 characters to the end
  // of the string.
  get sub() {
    return this.string.substr(this.tortuga, 64);
  }

  tokenizeNumber() {
    let match = this.sub.match(/^\d+(?:\.\d+)?/);
    if (match) {
      let token = this.createToken(TOK_NUMBER, Number(match[0]));
      this.advance(match[0].length);
      return token;
    } else {
      // This should not be reached
      throw new Error(`Invalid number at ${this.line}:${this.column}`);
    }
  }

  tokenizeSymbol () {
    let match = this.sub.match(/^([^\s()[\]]*)/);
    if (match && match[0].length > 0) { // Ensure it matches a non-empty symbol
      let token = this.createToken(TOK_SYMBOL, match[0]);
      this.advance(match[0].length);
      return token;
    }

    throw new Error(`Invalid symbol starting with '${this.string[this.tortuga]}' at ${this.line}:${this.column}`);
  }

  tokenizeKeyword() {
    // Keywords start with ':' e.g. :foo
    // The regex should match ':' followed by symbol-like characters.
    let match = this.sub.match(/^:([^\s()[\]{}:"#'.]+)/);
    if (match) {
      let token = this.createToken(TOK_KEYWORD, match[1]); // Value is the keyword without ':'
      this.advance(match[0].length); // Advance by the length of the full token (e.g., ":foo")
      return token;
    } else {
      // This implies a ':' was not followed by a valid keyword identifier
      throw new Error(`Invalid keyword at ${this.line}:${this.column}`);
    }
  }

  createToken(type, value) {
    const token = {
      type, value,
      line: this.line, column: this.column
    }

    if (this.filePath)
      token.filePath = this.filePath;

    return token;
  }

  [Symbol.iterator]() {
    return this;
  }
}

// const tokenizer = new Tokenizer(string, { filePath: "imaginary" });
// for (const token of tokenizer) {
//   console.log(token);
// }

describe("Tokenizer", function () {
  it("tokenizes a symbol", function () {
    let tokenizer = new Tokenizer('symbol');
    assert.deepEqual([
      {
        type: 'Y', value: 'symbol',
        line: 1, column: 1
      }
    ], [...tokenizer]);
  });

  it("tokenizes a number", function () {
    const tokenizer = new Tokenizer("1");
    assert.deepEqual([
      { type: 'N', value: 1,
        line: 1, column: 1 }
    ], [...tokenizer]);
  });

  it("tokenizes a keyword", function () {
    const tokenizer = new Tokenizer(":keyword");
    assert.deepEqual([
      { type: 'K', value: "keyword",
        line: 1, column: 1 }
    ], [...tokenizer]);
  });

  it("etc, etc...", function () {
    let tokenizer = new Tokenizer("((love))");
    assert.deepEqual([
      {
        type: '(', value: '(',
        line: 1, column: 1
      }, {
        type: '(', value: '(',
        line: 1, column: 2
      }, {
        type: 'Y', value: 'love',
        line: 1, column: 3
      }, {
        type: ')', value: ')',
        line: 1, column: 7
      }, {
        type: ')', value: ')',
        line: 1, column: 8
      }
    ], [...tokenizer]);
  });
});
// console.log(tokenizer.next());
// console.log(tokenizer.next());
// console.log(tokenizer.next());
// console.log(tokenizer.next());

// const tokenator = new Tokenator(string, { file: "imaginary" });
// // console.log(tokenator.next());
// for (const token of tokenator) {
//   console.log(token);
// }

// process.exit(0);

// // class Tokens {
// //   constructor(string) {
// //     this.string
// //   }
// // }

// class Tokenizer {

//   *tokenize(string) {
//       var turtle = 0;
//     const hare   = string.length;
//       var line   = 1;
//       var column = 1;

//     while(turtle < hare) {
//       const char = string[turtle++];
//       switch (char) {
//         case '(':
//           yield char;
//       }
//     }
//   }

//   // *tokenize() {
//   //   yield {
//   //     line: 1,
//   //     columm: 1,
//   //     type: 1,
//   //     value: ""
//   //   };
//   //   yield 2;
//   //   yield this.string;
//   // }
// }

// const tokenizer = new Tokenizer();
// const tokens = tokenizer.tokenize(string)
// for(const token of tokens) {
//   console.log(token);
// }


// // const tokens = tokenize("love");
// // for(const token of tokens) {
// //   console.log(token);
// // }


// // describe("tokenize", function () {
// //   it(""
// // });

