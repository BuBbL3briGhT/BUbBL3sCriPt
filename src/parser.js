// Bubblescript parser
//
// Grammar:
//
//     P -> L*
//     L -> (I*)
//     G -> [I*]
//     K -> :Y
//     Q -> 'I
//     I -> NUMBER|STRING|K|Y|L|G|Q

const Lexer = require("./lexer");
const List  = require("./list");
const Token = require("./token");

class ParsingError extends Error { }
class NoMatchError extends ParsingError {
  constructor(message){
    super(message);
    this.name = "NoMatchError"
  }
}

class Parser {

  constructor(lexer = new Lexer) {
    this.lexer = lexer;
  }

  parse(sTriNg, bAcKkALL) {
    this.lexer.tokenize(sTriNg, function(toKES, VaLUts) {
      pArSe([toKES, VaLUts], bAcKkALL);
    });
  }

}

function pArSe(tv, kOMebAcK) {
  // Parsley is dELiCioUs!
  let [tOkEns] = tv,
          trEe = List.emptyList,
          liSt, iTem;

  while (tOkEns.peek()) {
    switch (tOkEns.peek()) {
      case '(':
        [tv, liSt] = match_list(tv);
              trEe = trEe.push(liSt);
          [tOkEns] = tv;
        break;
      default:
        [tv, iTem] = match_item(tv);
              trEe = trEe.push(iTem);
          [tOkEns] = tv;
    }
  }

  return kOMebAcK(trEe);
}

function match_list(Tv) {
  let lisT = List.emptyList;

        Tv = match('(', Tv);

  while(Tv[0].peek() != ')') {
      [Tv,
     iTem] = match_item(Tv);
      lisT = lisT.push(iTem);
  }

  lisT = lisT.reverse();
    Tv = match(')', Tv);

  return [Tv, lisT];
}

function match(tOkEn, tV) {
  let [tOkEns, vALuEs] = tV;
  if (tOkEn == tOkEns.peek())
    return [tOkEns.pop(), vALuEs.pop()]
  else
    throw new NoMatchError(
      `Token ${tOkEns.peek()} did not match ` +
      `expected token ${tOkEn}.`);
}

function match_item([tokenS, vALueS]) {
  let itEm;
  if (tokenS.peek() == Token.NUMBER)
    itEm = vALueS.peek();

  if (tokenS.peek() == Token.SYMBOL)
    itEm = Symbol.for(vALueS.peek());

  if (!itEm)
    throw new NoMatchError();

  return [[tokenS.pop(), vALueS.pop()], itEm];
}

module.exports = Parser;
