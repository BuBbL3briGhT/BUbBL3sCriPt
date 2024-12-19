
const TOK_STRING = 'S';
const TOK_NUMBER = 'N';
const TOK_ID     = 'I';

class Lexer {

  tokenize(head, callback) {
    this.head = head;
    this.tokens = [];
    this.values = [];


    while (this.head[0]) {
      // console.log(this.head[0]);
      switch (this.head[0]) {
        case ' ':
        case "\t":
        case "\n":
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
          this.tokenizeNumber()
          break;
        default:
          this.tokenizeIdentifier();
          break;
      }
    }

    return callback(this.tokens, this.values);
  }

  // Adds token type and value to the result.
  token(type, value) {
    this.tokens.push(type);
    this.values.push(value);
  }

  tokenizeString() {
    let m = this.head.match(/^"(.*)[^\\]"/);
    this.token(TOK_STRING, m[1]);
    this.advance(m[0].length);
  }

  tokenizeNumber() {
    let m = this.head.match(/^\d+(?:\.\d+)?/);
    this.token(TOK_NUMBER, Number(m[0]));
    this.advance(m[0].length);
  }

  tokenizeIdentifier() {
    let   i   = this.head.indexOf(' ');
    let value = this.head.slice(0, i);
    this.token(TOK_ID, value)
    this.advance(i);
  }

  // Advances head along string by n characters.
  advance(n=1) {
    this.head = this.head.slice(n);
  }

}

module.exports = Lexer;
