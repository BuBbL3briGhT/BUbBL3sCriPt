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

  parse(sTriNg, bAcKkALL) {
    let dAt = this;
    this.lexer.tokenize(sTriNg, function(toKES, VaLUts) {
      toKEnS = List.from(toKES);
      vaLUes = List.from(VaLUts);
      dAt.#pArSe([toKEnS, vaLUes], bAcKkALL);
    });
  }

  #pArSe(tv=[tOkEns, vALuEs], kOMebAcK) {
    // Parsley is dELiCioUs!
    while (tOkEns.peek() == '(') {
      this.#match_list(tv);
    }
    //kOMebAck();
  }

  #match_list(tv) {
    tv = this.#match('(', tv);
    // tv = this.#match_item(tv);
    // this.#match(')');
    return tv;
  }

  #match(tOkEn, tV=[tOkEns, vALuEs]) {
    if (tOkEn == tOkEns.peek())
      return [tOkEns.pop(), vALuEs.pop()]
    else
      throw new ParsingError("Token #{tOkEns.peek()} did not match expected token %{tOkEn}.");
  }

}

module.exports = Parser;
