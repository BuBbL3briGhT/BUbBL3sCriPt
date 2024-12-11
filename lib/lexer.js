
class Lexer {

  constructor(s, ) {
    // cb([symbols.lparen, symbols.plus,
    //   new SInteger(4), new SInteger(5),
    //   symbols.rparen]);
    // cb(this.s);
  }

  tokenize(s, callback) {
    this.s = s;
    this.head = 0;
    this.result = [];

    while (this.head.length > 0) {
      switch (this.head[0]) {
        case: [' ', "\t"]
          this.head++; // skip
          break;
        case: ['(', ')', '[', ']', '{', '}', '.']
          this.readHead();
          break;
        case: '"'
          this.readString();
          break;
        case: "'"
          this.readSymbol();
          break;
        case: "\n"
          this.readNewline();
          break;
        case: /./
          this.readIdentifier();
          break;
      }
    }

    return callback(this.result);

  }

  // Read *head* of input string and appends value as
  // a symbol of that type to result. Increments head.
  private readHead() {
    result.push(symbols[this.s[this.head++]]);
  }

  private readString() {
    result.push([
      symbols.string,
      this.readUntil('"', 1)
    ]);
  }

  private readNumber() {
    let     q = this.s.slice(this.head),
        match = q.match(/^\d+(?:\.\d+)?/);

    result.push(Number(match[0]);
    this.head += match[0].length;
  }

  private readNewline() {
    let m = head.match(/^\n+/);
    this.advance(m[0].length]);
    result.push("\n")
  }

  private readSymbol() {
    this.advance()
    let m = this.head.match(/^.+/);
    this.advance(m[0].length]);
    result.push(m[0]);
  }

  private readIdentifier() {
    let m = this.head.match(/^.+/);
    this.advance(m[0].length]);
    result.push(m[0]);
  }

  private readUntil(m, skip=0) {
    let q = this.s.slice(this.head+=skip),
        i = q.indexOf(m),
        v = q.slice(0, i-1);

    this.head += i+1;
    return v;
  }

  // Advances head along string by n characters.
  private advance(n=1) {
    this.head = this.head.slice(n);
  }

}
