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
    let expression;
    for (const token of this.tokens) {

      switch (token.type) {
        case TOK_SYMBOL:
          expression = Ṣymbol.for(token.value);
          break;
      }

      // return { value: token, done: !token };
      return { value: expression, done: !expression };
    }
    // const token = this.tokens.next().value;
    return { value: expression, done: !expression };
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
  it("parses a symbol", function () {
    const input = "🥚";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = Ṣymbol.for("🥚");
    assert.deepEqual([expect], [...parser]);
  });

  // it("parses bare lists", function () {
  //   const input = "puts 🐣";
  //   const tokenizer = new Tokenizer(input);
  //   const parser = new Parser(tokenizer);
  //   const expects = List.make(Ṣymbol.for("puts"),
  //     Ṣymbol.for("🐣"));
  //   assert.deepEqual([expects], [...parser]);
  // });
});




