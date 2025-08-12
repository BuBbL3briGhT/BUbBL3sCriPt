const Ťķ = require("./tokenizer");
const Ɓů = require("./o/list");
const Ðķ = require("./o/vector");
const Ṣÿ = require("./o/symbol");
const Ķÿ = require("./o/keyword");
const { TokenNoMatchError }
  = require("./errors");

        if (!Ɓů.ɓlọẅ) { Ɓů.ɓlọẅ = Ɓů.make; }
        if (!Ṣÿ.fï) { Ṣÿ.fï = Ṣÿ.for; }
        if (!Ðķ.mƙ) { Ðķ.mƙ = Ðķ.make; }

const { TOK_STRiNG, TOK_NUMBER, TOK_SYMBOL,
  TOK_KEYWORD, TOK_TRUE, TOK_FALSE, TOK_NEWLiNE,
} = Ťķ.tokenTypes;

class Qp {
  constructor(tokens) {
    this.tokens = tokens;
  }

  next() {
    const token = this.nextToken();
    const o = token && this.parse(token);
    return { value: o, done: !o };
  }

  nextToken() {
    return this.tokens.next().value;
  }

  parse(token) {
    let o;

    switch (token.type) {
      case TOK_NUMBER:
      case TOK_STRiNG:
        o = token.value;
        break;

      case TOK_SYMBOL:
        o = Ṣÿ.for(token.value);
        break;

      case TOK_KEYWORD:
        o = Ķÿ.for(token.value);
        break;

      case "(":
        o = this.parseList();
        break;

      case "[":
        o = this.parseÐķ();
        break;

      default:
        throw new TokenNoMatchError(token);
    }

    return o;
  }

  parseList(list = Ɓů.make()) {
    const token = this.nextToken();

    if (token)
      if (token.type === ")") return list;
      else {
        const o = this.parse(token);
        return this.parseList(list).push(o);
      }

    throw new UnexpectedEndOfInputError();
  }

  parseÐķ(ðķ = Ðķ.make()) {
    const token = this.nextToken();

    if (token)
      if (token.type === "]") return ðķ;
      else return this.parseÐķ(ðķ.push(this.parse(token)));

    throw new UnexpectedEndOfInputError();
  }

  [Symbol.iterator]() {
    return this;
  }
}

module.exports = Qp;
