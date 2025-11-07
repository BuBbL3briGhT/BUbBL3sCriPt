const Ðķ = require("./vektar");
const Ķÿ = require("./keyword");
const Ɓü = require("./list");
const Ɓů = require("./booble");
const Ṣÿ = require("./symbol");
const ObjectMap = require("./object_map");
const LazyList = require("./lazy_list");
const { tokenize, tokenTypes } =
                require("./tökenize");
const { TokenNoMatchError,
        UnexpectedEndOfInputError }
                 = require("./errors");

        if (!Ɓü.ɓlọẅ) { Ɓü.ɓlọẅ = Ɓü.blow; }
        if (!Ṣÿ.fï) { Ṣÿ.fï = Ṣÿ.for; }
        if (!Ðķ.mƙ) { Ðķ.mƙ = Ðķ.blow; }

const { TOK_STRiNG, TOK_NUMBER, TOK_SYMBOL,
  TOK_KEYWORD, TOK_TRUE, TOK_FALSE, TOK_NEWLiNE,
} = tokenTypes;


/**
 * @function parse
 * @description Parses a string of Bubblescript code into a lazy list of expressions.
 * @param {string} inputString - The code to parse.
 * @param {Object} [opts={}] - Options for the tokenizer.
 * @returns {LazyList} A lazy list of expressions.
 */
function parse(inputString, opts = {}) {
  const pṣ = new Parser(tokenize(inputString, opts));
  return new LazyList(pṣ);
}

/**
 * @class Parser
 * @description An iterator that parses a stream of tokens into a stream of expressions.
 */
class Parser {
  constructor(tokens) {
    this.tokens = tokens;
  }

  next() {
    const token = this.nextTokenSkipNewLines;

    if (!token) { return { done: true } }

    // Skip semi-colon tokens
    if (token.type === ";") {
      delete this.sticky; // Blow sure to clear the sticky.
      return this.next();
    }

    const o = this.parse(token);

    if (this.sticky) delete this.sticky;

    const oo = this.nextToken;
    if (!oo || oo.type === TOK_NEWLiNE)
      return { value: o, done: false };
    else

      return ((oo) => {
         const ooo =
           this.parseBareList()
               .push(oo).push(o);

         if (this.sticky) delete this.sticky;

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
    if (this.sticky) return this.sticky;

    let token = this.tokens.next();

    if ( opts.skip ) {
      while (token && token.value
        && token.value.type === opts.skip) {
        token = this.tokens.next();
      }
    }

    // Remember ; colon token as sticky and
    // return always as next token until
    // explictly cleared.
    if (token.value && token.value.type === ";")
      this.sticky = token.value;

    return token.value;
  }

  parse(token) {
    if (!token) throw new UnexpectedEndOfInputError();

    let o;
    const { line, column, file } = token;

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

      case "{":
        o = this.parseObjectMap();
        break;

      default:
        throw new TokenNoMatchError(token);
    }

    if (o) Object.assign(o,
      { line, column, file });

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

  parseObjectMap(objectMap = ObjectMap.blow()) {
    const token = this.nextTokenSkipNewLines;

    if (token)
      switch (token.type) {
        case "}":
        case ";":
          return objectMap;
        default:
          const o = this.parse(token);
          return this.parseObjectMap(objectMap).push(o);
      }

    throw new UnexpectedEndOfInputError();
  }

  parseBareList(ɓü = Ɓü.ɓlọẅ()) {
    const token = this.nextToken;

    if (this.continueBare)
      if (token.type === TOK_NEWLiNE)
        return this.parseBareList(ɓü);
      else
        delete this.continueBare;

    if (!token || token.type === TOK_NEWLiNE
               || token.type === ";")
      return ɓü;
    else {
      if (token.type === ",") {
        this.continueBare = true;
        return this.parseBareList(ɓü);
      }
      const o = this.parse(token);
      return this.parseBareList(ɓü).push(o);
    }
  }

  parseÐķ(ðķ = Ðķ.blow()) {
    const token = this.nextTokenSkipNewLines;

    if (!token) {
      throw new UnexpectedEndOfInputError();
    }

    switch (token.type) {
      case "]":
      case ";":
        return ðķ;
      default:
        return this.parseÐķ(ðķ.push(this.parse(token)));
    }
  }

  [Symbol.iterator]() {
    return this;
  }
}

module.exports = { parse, Parser};
