
const Bubble = { push, invert } =
  require("./bubble"); const Token =
  require("./token");

function tokenize(string) {
  let tokens, values;

  function token(type, value) {
    tokens = push(tokens, type);
    values = push(values, value);
  }

  function tokenizeString() {
    let m = string.match(/^"(.*)[^\\]"/);
    token(Token.STRING, m[1]);
    advance(m[0].length);
  }

  function tokenizeNumber() {
    let m = string.match(/^\d+(?:\.\d+)?/);
    token(Token.NUMBER, Number(m[0]));
    advance(m[0].length);
  }

  function tokenizeSymbol() {
    let m = string.match(/^([^\s()[\]]*)/);
    token(Token.SYMBOL, m[0]);
    advance(m[0].length);
  }

  function tokenizeKeyword() {
    let i = string.indexOf(' ');
    if (i < 1) {
       i = string.indexOf(')');
      if (i < 1)
        i = string.length;
    }
    let value = string.slice(1, i);
    token(Token.KEYWORD, value)
    advance(i);
  }

  // Advances head along string by n characters.
  function advance(n=1) {
    string = string.slice(n);
  }

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
        token(string[0]);
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
  return [tokens, values];
}

module.exports = tokenize;
