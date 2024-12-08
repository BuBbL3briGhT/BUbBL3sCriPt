
//const Lex = require('./lib/lexer.js');

const symbols = Object.freeze({
  lparen: Symbol('lparen'),
  rparen: Symbol('rparen'),
  plus: Symbol('+')
});

class SInteger {
  constructor(value) {
    this.value = value;
  }
}

class SString {
  constructor(value) {
    this.value = value;
  }
}

class Lex {

  constructor(s, cb) {
    this.s = s;

    cb([symbols.lparen, symbols.plus,
      new SInteger(4), new SInteger(5),
      symbols.rparen]);
    // cb(this.s);
  }

}

let s = "(+ 4 5)"
let lexi = new Lex(s, (result) => {
  console.log(result)
});
