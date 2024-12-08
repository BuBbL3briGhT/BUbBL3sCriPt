
//const Lex = require('./lib/lexer.js');


class Lex {

  constructor(s, cb) {
    this.s = s;
    cb(this.s);
  }

}

let s = "(+ 4 5)"
let lexi = new Lex(s, (result) => {
  console.log(result)
});
