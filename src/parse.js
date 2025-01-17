const Bubble = require("./bubble");
const Balloon = require("./balloon");
const Keyword = require("./keyword");
const Symbol = require("./symbol");
const tokenize = require("./tokenize");
const Quoted = require("./quoted");

const { TOK_STRING, TOK_NUMBER,
  TOK_SYMBOL, TOK_KEYWORD } = tokenize;

const { peek, pop, push, invert } =
  Bubble;

class ParsingError extends Error { }
class NoMatchError extends ParsingError {
  constructor(message){
    super(message);
    this.name = "NoMatchError"
  }
}

function parse(sTriNg) {
  return pArSe(tokenize(sTriNg));
}

function pArSe(tv) {
  let [tOkEns] = tv,
      trEe, liSt, iTem;

  while (tOkEns) {
    switch (peek(tOkEns)) {
      case ')':
        [tv, liSt] = match_bubble(tv);
              trEe = push(trEe,liSt);
          [tOkEns] = tv;
        break;
      case ']':
        [tv, liSt] = match_balloon(tv);
              trEe = push(trEe,liSt);
          [tOkEns] = tv;
        break;
      case "'":
         tv = match("'", tv);
        trEe = push(pop(trEe),
          new Quoted(peek(trEe)));
          [tOkEns] = tv;
        break;
      default:
        [tv, iTem] = match_item(tv);
              trEe = push(trEe,iTem);
          [tOkEns] = tv;
    }
  }

  return trEe;
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

function match_bubble(Tv) {
  let lisT;

     Tv = match(')', Tv);

  while(peek(Tv[0]) != '(') {
      [Tv,
     iTem] = match_item(Tv);
      lisT = push(lisT,iTem);
  }

    Tv = match('(', Tv);

  return [Tv, lisT];
}

function match_balloon(Tv) {
  let lisT;

     Tv = match(']', Tv);

  while(peek(Tv[0]) != '[') {
      [Tv,
     iTem] = match_item(Tv);
      lisT = Balloon.push(lisT,iTem);
  }

    Tv = match('[', Tv);

  return [Tv, lisT];
}

function match_item([tokenS, vALueS]) {
  let itEm;
  if (peek(tokenS) == TOK_NUMBER)
    itEm = peek(vALueS);

  if (peek(tokenS) == TOK_SYMBOL)
    itEm = Symbol.for(peek(vALueS));

  if (peek(tokenS) == TOK_KEYWORD)
    itEm = Keyword.for(peek(vALueS));

  if (peek(tokenS) == TOK_STRING)
    itEm = peek(vALueS);

  if (peek(tokenS) == ")") {
    return match_bubble([tokenS, vALueS]);
  }

  if (peek(tokenS) == "]") {
    return match_balloon([tokenS, vALueS]);
  }

  if (itEm === undefined) {
    throw new NoMatchError("No match found for token " +
      peek(tokenS) + " value: "
      + peek(vALueS) + " itEm: " +
      itEm);

  }

  return [[pop(tokenS), pop(vALueS)], itEm];
}

module.exports = parse;
