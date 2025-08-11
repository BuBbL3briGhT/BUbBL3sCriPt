//
// const tokenizer = new Tokenizer(string, { filePath: "imaginary" });
// for (const token of tokenizer) {
//   console.log(token);
// }

const TOK_KEYWORD = 'K',
      TOK_NUMBER  = 'N',
      TOK_STRiNG  = 'S',
      TOK_SYMBOL  = 'Y',
      TOK_TRUE    = 'T',
      TOK_FALSE   = 'F';

class Tokenizer {
  constructor(string, opts={}) {
    this.string = string;
    this.hare = string.length;
    this.tortuga = 0;
    this.line = 1;
    this.column = 1;
    this.filePath = opts.filePath;
  }

  next() {

    let token;

    while (this.tortuga < this.hare && !token) {

      const char = this.string[this.tortuga];

      switch (char) {
        case ' ':
        case '\t':
          this.advance(); // Consumes whitespace, updates column
          break;
        case '\n':
        case '\r':
          this.advance(); // Consumes newline, updates line and column
          break;
        case '(':
        case ')':
        case '[':
        case ']':
        case '{':
        case '}':
        case '.':
        case "°":
          token = this.createToken(char, char);
          this.advance();
          break;
        case '"':
        case "'":
          token = this.tokenizeString();
          break;
        case ':':
          token = this.tokenizeKeyword();
          break;
        case '#':
          this.eatComment();
          break;
        default:
          if (/\d/.test(char)) {
            token = this.tokenizeNumber();
          } else if (/[^\s()[\]{}:"#'.]/.test(char)) { // Ensure it's a valid start for a symbol
            token = this.tokenizeSymbol();
          } else {
            throw new Error(`Unexpected character: '${char}' at ${this.line}:${this.column}`);
          }
      }
    }

    return { value: token, done: !token };
  }

  // Advances turtle along string by n characters, updating line and column.
  advance(n = 1) {
    for (let i = 0; i < n; i++) {
       const char = this.string[this.tortuga];
      if (char === '\n' || char === '\r') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
    }
    this.tortuga += n;
  }

  getSub(length) {
    return this.string.substr(this.tortuga, length);
  }

  // Returns a sub-string of this.string
  // beginning at the current tortuga position
  // and continuing for 64 characters to the end
  // of the string.
  get sub() {
    return this.getSub(64);
  }

  tokenizeString() {
    let match= this.getSub().match(/^"((?:[^\\"]|\\.)*)"/);
    if (match) {
      const token = this.createToken(TOK_STRiNG, match[1]);
      this.advance(match[0].length);
      return token;
    } else {
      // This should not be reached if called appropriately
      throw new Error(`Unterminated string at ${line}:${column}`);
    }
  }

  tokenizeNumber() {
    const match = this.sub.match(/^\d+(?:\.\d+)?/);
    if (match) {
      const token = this.createToken(TOK_NUMBER, Number(match[0]));
      this.advance(match[0].length);
      return token;
    } else {
      // This should not be reached
      throw new Error(`Invalid number at ${this.line}:${this.column}`);
    }
  }

  tokenizeSymbol () {
    const match = this.sub.match(/^([^\s()[\]]*)/);
    if (match && match[0].length > 0) { // Ensure it matches a non-empty symbol
      const token = this.createToken(TOK_SYMBOL, match[0]);
      this.advance(match[0].length);
      return token;
    }

    throw new Error(`Invalid symbol starting with '${this.string[this.tortuga]}' at ${this.line}:${this.column}`);
  }

  tokenizeKeyword() {
    // Keywords start with ':' e.g. :foo
    // The regex should match ':' followed by symbol-like characters.
    const match = this.sub.match(/^:([^\s()[\]{}:"#'.]+)/);
    if (match) {
      const token = this.createToken(TOK_KEYWORD, match[1]); // Value is the keyword without ':'
      this.advance(match[0].length); // Advance by the length of the full token (e.g., ":foo")
      return token;
    } else {
      // This implies a ':' was not followed by a valid keyword identifier
      throw new Error(`Invalid keyword at ${this.line}:${this.column}`);
    }
  }

  eatComment() {
    const sub = this.getSub()
    const newlineIndex = sub.indexOf("\n");
    if (newlineIndex > -1) {
      // Advance past the comment line including the newline
      this.advance(newlineIndex + 1);
    } else {
      // Comment goes to the end of the string
      this.advance(sub.length);
    }
  }


  createToken(type, value) {
    const token = {
      type, value,
      line: this.line, column: this.column
    }

    if (this.filePath)
      token.filePath = this.filePath;

    return token;
  }

  [Symbol.iterator]() {
    return this;
  }
}

module.exports = Tokenizer;
