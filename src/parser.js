const Tokenizer = require("./tokenizer");

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

const input = "hi-ho";
const tokenizer = new Tokenizer(input);
const parser = new Parser(tokenizer);

for (const expression of parser) {
  console.log(expression);
}




