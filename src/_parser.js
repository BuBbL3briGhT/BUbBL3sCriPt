const Ťķ = require("./tokenizer");
const Ɓü = require("./o/list");
const Ðķ = require("./o/vector");
const Ṣÿ = require("./o/symbol");
const Ķÿ = require("./o/keyword");
const Ɓů = require("./o/bubble");
const { TokenNoMatchError,
        UnexpectedEndOfInputError }
                 = require("./errors");

        if (!Ɓü.ɓlọẅ) { Ɓü.ɓlọẅ = Ɓü.make; }
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
    const token = this.nextToken;
    const o = token && this.parse(token);
    return { value: o, done: !o };
  }

  get nextToken() {
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

      case "°":
        o = new Ɓů(this.parse(this.nextToken));
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

  parseList(list = Ɓü.ɓlọẅ()) {
    const token = this.nextToken;

    if (token)
      if (token.type === ")") return list;
      else {
        const o = this.parse(token);
        return this.parseList(list).push(o);
      }

    throw new UnexpectedEndOfInputError();
  }

  parseÐķ(ðķ = Ðķ.make()) {
    const token = this.nextToken;

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
