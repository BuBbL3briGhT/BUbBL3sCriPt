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
const Bubble  = require("./bubble");
const Token = require("./token");
const Keyword = require("./keyword");

const {peek,pop,push,invert} = Bubble;

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
    this.lexer.tokenize(sTriNg, function(error, toKES, VaLUts) {
      if (error) {
        throw error;
      }
      pArSe([toKES, VaLUts], bAcKkALL);
    });
  }

}

function pArSe(tv, kOMebAcK) {
  let [tOkEns] = tv,
          // trEe = Bubble.air,
          trEe = null,
          liSt, iTem;
  try {

    while (tOkEns) {
      switch (peek(tOkEns)) {
        case '(':
          [tv, liSt] = match_bubble(tv);
                trEe = push(trEe,liSt);
            [tOkEns] = tv;
          break;
        default:
          [tv, iTem] = match_item(tv);
                trEe = push(trEe,iTem);
            [tOkEns] = tv;
      }
    }
  } catch (error) {
    return kOMebAcK(error);
  }
  return kOMebAcK(null, trEe);
}

function match_bubble(Tv) {
  // let lisT = Bubble.air;
  let lisT;

        Tv = match('(', Tv);

  while(peek(Tv[0]) != ')') {
      [Tv,
     iTem] = match_item(Tv);
      lisT = push(lisT,iTem);
  }

  // lisT = invert(lisT);
    Tv = match(')', Tv);

  return [Tv, lisT];
}

function match(tOkEn, tV) {
  let [tOkEns, vALuEs] = tV;
  if (tOkEn == peek(tOkEns))
    return [pop(tOkEns), pop(vALuEs)]
  else
    throw new NoMatchError(
      `Token ${peek(tOkEns)} did not match ` +
      `expected token ${tOkEn}.`);
}

function match_item([tokenS, vALueS]) {
  // console.log(tokenS.peek(), vALueS.peek());
  let itEm;
  if (peek(tokenS) == Token.NUMBER)
    itEm = peek(vALueS);

  if (peek(tokenS) == Token.SYMBOL)
    itEm = Symbol.for(peek(vALueS));

  if (peek(tokenS) == Token.KEYWORD)
    itEm = Keyword.for(peek(vALueS));

  if (peek(tokenS) == "(") {
    return match_bubble([tokenS, vALueS]);
  }

  if (itEm === undefined) {
    // {
    //   token: tokenS.peek(),
    //   value: vALueS.peek(),
    //   item: itEm
    // }
    throw new NoMatchError("No match found for token " +
      peek(tokenS) + " value: "
      + peek(vALueS) + " itEm: " +
      itEm);

  }

  return [[pop(tokenS), pop(vALueS)], itEm];
}

module.exports = Parser;
