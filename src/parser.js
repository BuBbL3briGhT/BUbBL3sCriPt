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
    let expr; // expression
    for (const token of this.tokens) {

      switch (token.type) {
        case TOK_SYMBOL:
          expr = Ṣymbol.for(token.value);
          break;
        case TOK_NUMBER:
          expr = token.value;
          break;
        default:
          throw new Error("No match for token "
            + JSON.stringify(token));
      }

      // return { value: token, done: !token };
      return { value: expr, done: !expr };
    }
    // const token = this.tokens.next().value;
    return { value: expr, done: !expr };
  }

  [Symbol.iterator]() {
    return this;
  }
}

const assert = require("assert");

describe("Parser", function () {

  it("parses a symbol", function () {
    const input = "🥚";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = Ṣymbol.for("🥚");
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a number", function () {
    const input = "42";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = 42;
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


// const input = "hi-ho";
// const tokenizer = new Tokenizer(input);
// const parser = new Parser(tokenizer);

// for (const expression of parser) {
//   console.log(expression);
// }

