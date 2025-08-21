const Ðķ = require("./vector");
const Ķÿ = require("./keyword");
const Ɓü = require("./list");
const Ɓů = require("./bubble");
const Ṣÿ = require("./symbol");
const LazyList = require("./lazy_list");
const { tokenize, tokenTypes } =
                require("./tökenize");
const { TokenNoMatchError,
        UnexpectedEndOfInputError }
                 = require("./errors");

        if (!Ɓü.ɓlọẅ) { Ɓü.ɓlọẅ = Ɓü.make; }
        if (!Ṣÿ.fï) { Ṣÿ.fï = Ṣÿ.for; }
        if (!Ðķ.mƙ) { Ðķ.mƙ = Ðķ.make; }

const { TOK_STRiNG, TOK_NUMBER, TOK_SYMBOL,
  TOK_KEYWORD, TOK_TRUE, TOK_FALSE, TOK_NEWLiNE,
} = tokenTypes;


// function parse(inputString) { // sTriNg -> inputString
//   // tokenize now returns a single LynktLyst of token objects
//   return parseTokens(tokenize(inputString)); // pArSe -> parseTokens
// }

function parse(inputString) {
  const pṣ = new Parser(tokenize(inputString));
  return new LazyList(pṣ);
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
  }

  next() {
    const token = this.nextTokenSkipNewLines;

    if (!token) { return { done: true } }

    const o = this.parse(token);

    const oo = this.nextToken;
    if (!oo || oo.type === TOK_NEWLiNE)
      return { value: o, done: false };
    else

      return ((oo) => {
         const ooo =
           this.parseBareList()
               .push(oo).push(o);
         return { value: ooo, done: false };
       })(this.parse(oo));
  }


  get nextToken() {
    return this.getNextToken();
  }

  // Provides the next token, skipping new line
  // tokens.
  get nextTokenSkipNewLines() {
    return this.getNextToken({ skip: TOK_NEWLiNE });
  }

  getNextToken(opts = {}) {
    let token = this.tokens.next();

    if ( opts.skip ) {
      while (token && token.value
        && token.value.type === opts.skip) {
        token = this.tokens.next();
      }
    }

    return token.value;
  }

  parse(token) {
    let o;

    switch (token.type) {
      case TOK_NUMBER:
      case TOK_STRiNG:
      case TOK_TRUE:
      case TOK_FALSE:
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
    const token = this.nextTokenSkipNewLines;

    if (token)
      switch (token.type) {
        case ")":
        case ";":
          return list;
        default:
          const o = this.parse(token);
          return this.parseList(list).push(o);
      }

    throw new UnexpectedEndOfInputError();
  }

  parseBareList(ɓü = Ɓü.ɓlọẅ()) {
    const token = this.nextToken;

    if (!token || token.type === TOK_NEWLiNE)
      return ɓü;
    else {
      const o = this.parse(token);
      return this.parseBareList(ɓü).push(o);
    }
  }

  parseÐķ(ðķ = Ðķ.make()) {
    const token = this.nextTokenSkipNewLines;

    if (token)
      if (token.type === "]") return ðķ;
      else return this.parseÐķ(ðķ.push(this.parse(token)));

    throw new UnexpectedEndOfInputError();
  }

  [Symbol.iterator]() {
    return this;
  }
}

module.exports = { parse, Parser};
