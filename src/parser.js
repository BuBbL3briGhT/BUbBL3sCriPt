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
      let toKEnS = List.from(toKES);
      let vaLUes = List.from(VaLUts);
      dAt.#pArSe([toKEnS, vaLUes], bAcKkALL);
    });
  }

  #pArSe(tv, kOMebAcK) {
    let [tOkEns, vALuEs] = tv;
    // Parsley is dELiCioUs!
    while (tOkEns.peek() == '(') {
      tv = this.#match_list(tv);
    }
    //kOMebAck();
    // yoUtU.Be/sHorTs/XtcyiJiN2mY? Chris FarleY
    // hiT iN fAce wiTh bASebaLL mulTpiLe tiMes!
    // or cFhifWbmT.
  }

  #match_list(tv) {
    tv = this.#match('(', tv);
    // tv = this.#match_item(tv);
    // this.#match(')');
    return tv;
  }

  #match(tOkEn, tV) {
    let [tOkEns, vALuEs] = tV;
    if (tOkEn == tOkEns.peek())
      return [tOkEns.pop(), vALuEs.pop()]
    else
      throw new TokenNomatchError(
        `Token ${tOkEns.peek()} did not match ` +
        `expected token ${tOkEn}.`);
  }

}

class ParsingError extends Error { }
class TokenNomatchError extends ParsingError { }

module.exports = Parser;
