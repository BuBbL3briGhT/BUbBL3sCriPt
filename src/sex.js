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
        default:
          if (/[^\s()[\]{}:"#'.]/.test(char)) { // Ensure it's a valid start for a symbol
            token = this.tokenizeSymbol();
            break;
          }
          throw new Error(`Unexpected character: '${char}' at ${this.line}:${this.column}`);
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

  tokenizeSymbol () {
    let _string = this.string.substr(this.tortuga, 32);
    let match = _string.match(/^([^\s()[\]]*)/);
    if (match && match[0].length > 0) { // Ensure it matches a non-empty symbol
      let token = this.createToken(TOK_SYMBOL, match[0]);
      this.advance(match[0].length);
      return token;
    }

    throw new Error(`Invalid symbol starting with '${this.string[this.tortuga]}' at ${this.line}:${this.column}`);
  }

  createToken(type, value) {
    return {
      type, value,
      line: this.line, column: this.column,
      filePath: this.filePath
    };
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
  it("Tokenizes BubbleScript", function () {
    let tokenizer = new Tokenizer("love");
    assert.deepEqual([
      {
        type: 'Y', value: 'love',
        line: 1, column: 1,
        filePath: undefined
      }
    ], [...tokenizer]);

    tokenizer = new Tokenizer("(love)", { filePath: "👟" });
    assert.deepEqual([
      {
        type: '(', value: '(',
        line: 1, column: 1,
        filePath: "👟"
      },
      {
        type: 'Y', value: 'love',
        line: 1, column: 2,
        filePath: "👟"
      },
      {
        type: ')', value: ')',
        line: 1, column: 6,
        filePath: "👟"
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

