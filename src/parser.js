const Tokenizer = require("./tokenizer");
const List = require("./o/list");
const Ṣymbol = require("./o/symbol");

const {
  TOK_STRiNG,
  TOK_NUMBER,
  TOK_SYMBOL,
  TOK_KEYWORD,
  TOK_TRUE,
  TOK_FALSE,
  TOK_NEWLiNE
} = Tokenizer.tokenTypes;

class Parser {

  constructor(tokens) {
    this.tokens = tokens;
  }

  next() {
    // for (const token of this.tokens) {
    //   return { value: token, done: !token };
    // }
    const token = this.tokens.next().value;
    return { value: token, done: !token };
  }

  [Symbol.iterator]() {
    return this;
  }
}

// const input = "hi-ho";
// const tokenizer = new Tokenizer(input);
// const parser = new Parser(tokenizer);

// for (const expression of parser) {
//   console.log(expression);
// }

const assert = require("assert");

describe("Parser", function () {
  it("parses bare lists", function () {
    const input = "puts 🐣";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expects = List.make(Ṣymbol.for("puts"),
      Ṣymbol.for("🐣"));
    assert.deepEqual([expects], [...parser]);
  });
});




