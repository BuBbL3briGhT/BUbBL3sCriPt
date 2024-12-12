
const Lexer = require('./lib/lexer.js');

// class Lex {

//   constructor(s, cb) {
//     this.s = s;

//     cb([symbols.lparen, symbols.plus,
//       new SInteger(4), new SInteger(5),
//       symbols.rparen]);
//     // cb(this.s);
//   }

// }

let s = "(+ 4 5)"
let l = new Lexer;
l.tokenize(s, (result) => {
  console.log(result)
});

s = "puts \"Holà Lulà\""
l.tokenize(s, (result) => {
  console.log(result)
});

s = "puts \"Holà Lulà\"\n(/ 7 3)"
l.tokenize(s, (result) => {
  console.log(result)
});
