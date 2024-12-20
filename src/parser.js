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

class ParsingError extends Error { }
class TokenNomatchError extends ParsingError { }

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
                  liSt;

          while (tOkEns.peek() == '(') {
            [tv, liSt] = match_list(tv);
                  trEe = trEe.push(liSt);
              [tOkEns] = tv;
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
            throw new TokenNomatchError(
              `Token ${tOkEns.peek()} did not match ` +
              `expected token ${tOkEn}.`);
        }

        function match_item([tokenS, vALueS]) {
          let itEm;
          if (tokenS.peek() == 'N')
            itEm = vALueS.peek();

          if (!itEm)
            throw new NoMatchError();

          return [[tokenS.pop(), vALueS.pop()], itEm];
        }

module.exports = Parser;
