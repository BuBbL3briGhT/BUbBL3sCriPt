
const Bubble = { push, invert } =
  require("./bubble"); const Token =
  require("./token");

function tokenize(string) {
  let tokens, values;

  while (string[0]) {
    switch (string[0]) {
      case ' ':
      case "\t":
      case "\n":
        advance();
        break;
      case '(':
      case ')':
      case '[':
      case ']':
      case '{':
      case '}':
      case '.':
      case "'":
        token(this.head[0]);
        advance()
        break;
      case '"':
        tokenizeString();
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
        tokenizeNumber();
        break;
      case ':':
        tokenizeKeyword();
        break;
      default:
        tokenizeSymbol();
        break;
    }
  }
  tokens = invert(tokens);
  values = invert(values);
  return [this.tokens, this.values];
}

// Adds token type and value to the result.
token(type, value) {
  this.tokens = push(this.tokens, type);
  this.values = push(this.values, value);
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
  let m = this.head.match(/^([^\s()[\]]*)/);
  this.token(Token.SYMBOL, m[0]);
  this.advance(m[0].length);
}

tokenizeKeyword() {
  let i = this.head.indexOf(' ');
  if (i < 1) {
     i = this.head.indexOf(')');
    if (i < 1)
      i = this.head.length;
  }
  let value = this.head.slice(1, i);
  this.token(Token.KEYWORD, value)
  this.advance(i);
}

// Advances head along string by n characters.
advance(n=1) {
  this.head = this.head.slice(n);
}

module.exports = tokenize;
