
class Lexer {

  tokenize(head, callback) {
    this.head = head;
    this.result = [];


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
          this.result.push([this.head[0]]);
          this.advance()
          break;
        case '"':
          this.tokenizeString();
          break;
        case "'":
          this.tokenizeSymbol();
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
        case "\n":
          this.tokenizeNewline();
          break;
        default:
          this.tokenizeIdentifier();
          break;
      }
    }

    return callback(this.result);
  }


  tokenizeString() {
    let m = this.head.match(/^"(.*)[^\\]"/);
    // this.result.push([tokenTypes.string, m[1]]);
    this.result.push(['string', m[1]]);
    this.advance(m[0].length);
  }

  tokenizeNumber() {
    let m = this.head.match(/^\d+(?:\.\d+)?/);
    // this.result.push([tokenTypes.number, Number(m[0])]);
    this.result.push(['number', Number(m[0])]);
    this.advance(m[0].length);
  }

  tokenizeNewline() {
    let m = this.head.match(/^\n+/);
    this.result.push(['\n']);
    this.advance(m[0].length);
  }

  tokenizeSymbol() {
    let m = this.head.match(/^'(.+)/);
    this.result.push(['symbol', m[1]]);
    this.advance(m[0].length);
  }

  tokenizeIdentifier() {
    let i=this.head.indexOf(' ');
    this.result.push([
      'identifier',
      this.head.slice(0, i)
    ]);
    this.advance(i);
  }

  // Advances head along string by n characters.
  advance(n=1) {
    this.head = this.head.slice(n);
  }

}

module.exports = Lexer;
