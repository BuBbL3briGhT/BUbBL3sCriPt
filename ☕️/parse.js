import { Vektar, List, LazyList, ObjectMap } from "./list.js";
import Keyword from "./keyword.js";
import Bubble from "./bubble.js";
import Ṣÿ from "./symbol.js";
import { tokenize, tokenTypes }
                from "./tokenize.js";
import { TokenNoMatchError,
        UnexpectedEndOfInputError }
                 from "./errors.js";

// const { * } = tokenTypes;
const {
  TOK_STRiNG, TOK_NUMBER, TOK_SYMBOL, TOK_KEYWORD,
  TOK_TRUE, TOK_FALSE, TOK_NEWLiNE
} = tokenTypes;


/**
 * @function parse
 * @description Parses a string of Bubblescript code into a lazy list of expressions.
 * @param {string} inputString - The code to parse.
 * @param {Object} [opts={}] - Options for the tokenizer.
 * @returns {LazyList} A lazy list of expressions.
 */
export function parse(inputString, opts = {}) {
  const pṣ = new Parser(tokenize(inputString, opts));
  return new LazyList(pṣ);
}

/**
 * @class Parser
 * @description An iterator that parses a stream of tokens into a stream of expressions.
 */
export class Parser {
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
        o = this.parseSymbol(token)
        break;

      case TOK_KEYWORD:
        o = Keyword.for(token.value);
        break;

      case "°":
        o = new Bubble(this.parse(this.nextToken));
        break;

      case "(":
        o = this.parseList();
        break;

      case "[":
        o = this.parseVektar();
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

  parseSymbol(token) {
    return Ṣÿ.for(token.value);
  }

  parseList(list = List.make()) {
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

  parseObjectMap(objectMap = ObjectMap.make()) {
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

  parseBareList(list = List.make()) {
    const token = this.nextToken;

    if (this.continueBare)
      if (token.type === TOK_NEWLiNE)
        return this.parseBareList(list);
      else
        delete this.continueBare;

    if (!token || token.type === TOK_NEWLiNE
               || token.type === ";")
      return list;
    else {
      if (token.type === ",") {
        this.continueBare = true;
        return this.parseBareList(list);
      }
      const o = this.parse(token);
      return this.parseBareList(list).push(o);
    }
  }

  parseVektar(vektar = Vektar.make()) {
    const token = this.nextTokenSkipNewLines;

    if (!token) {
      throw new UnexpectedEndOfInputError();
    }

    switch (token.type) {
      case "]":
      case ";":
        return vektar;
      default:
        return this.parseVektar(vektar.push(this.parse(token)));
    }
  }

  [Symbol.iterator]() {
    return this;
  }
}
