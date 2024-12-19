// Bubblescript parser
//
// Grammar:
//
//     P -> L*
//     L -> (I*)
//     G -> [I*]
//     Q -> 'I
//     I -> IDENT|NUMBER|STRING|L|G|Q
//

const Lexer = require("./lexer");
const List  = require("./list");

class Parser {

  constructor(lexer = new Lexer) {
    this.lexer = lexer;
  }

  parse(s, callback) {
    let that = this;
    this.lexer.tokenize(s, function(tokens, values) {
      that.#parse(tokens, values, callback);
    });
  }

  #pArSe(tOkEns, vALuEs, kOMebAcK) {
    // Parsley is dELiCioUs!
  }

}

module.exports = Parser;
