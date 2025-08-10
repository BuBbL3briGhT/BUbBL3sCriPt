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
// }

class Tokenizer {
  constructor(string) {
    this.string = string;
  }

  *tokenize() {
    yield {
      line: 1,
      columm: 1,
      type: 1,
      value: ""
    };
    yield 2;
    yield this.string;
  }
}

const tokenizer = new Tokenizer(string);
const tokens = tokenizer.tokenize()
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

