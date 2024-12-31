
const List = require("./list");
const Token = require("./token");

class Lexer {

  tokenize(head, callback) {
    this.head = head;
    this.tokens = List.emptyList;
    this.values = List.emptyList;

    while (this.head[0]) {
      // console.log(this.head[0]);
      switch (this.head[0]) {
        case ' ':
        case "\t":
          this.advance();
          break;
        case '(':
        case ')':
        case '[':
        case ']':
        case '{':
        case '}':
        case '.':
        case "'":
        case "\n":
          this.token(this.head[0]);
          this.advance()
          break;
        case '"':
          this.tokenizeString();
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.tokenizeNumber();
          break;
        // case ':':
        //   this.tokenizeKeyword();
        default:
          this.tokenizeSymbol();
          break;
      }
    }

    this.tokens = this.tokens.reverse();
    this.values = this.values.reverse();

    return callback(this.tokens, this.values);
  }

  // Adds token type and value to the result.
  token(type, value) {
    this.tokens = this.tokens.push(type);
    this.values = this.values.push(value);
  }

  tokenizeString() {
    let m = this.head.match(/^"(.*)[^\\]"/);
    this.token(Token.STRING, m[1]);
    this.advance(m[0].length);
  }

  tokenizeNumber() {
    let m = this.head.match(/^\d+(?:\.\d+)?/);
    this.token(Token.NUMBER, Number(m[0]));
    this.advance(m[0].length);
  }

  tokenizeSymbol() {
    let   i   = this.head.indexOf(' ');

    if (i < 1) {
       i = this.head.indexOf(')');
      if (i < 1)
        i = this.head.length;
    }

    let value = this.head.slice(0, i);
    this.token(Token.SYMBOL, value)
    this.advance(i);
  }

  // Advances head along string by n characters.
  advance(n=1) {
    this.head = this.head.slice(n);
  }

}

module.exports = Lexer;
