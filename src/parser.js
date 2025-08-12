
  const        Ťķ = require( "./tokenizer" );

  const        Ļÿ = require(   "./o/list"  );

  const        Ṣÿ = require(  "./o/symbol" );

  const        Ķÿ = require( "./o/keyword" );


  const                                     {

      TOK_STRiNG, TOK_NUMBER, TOK_SYMBOL,

      TOK_KEYWORD, TOK_TRUE, TOK_FALSE,

      TOK_NEWLiNE

  }            =                Ťķ.tokenTypes;


                                  class Qp {

                     constructor(tokens) {

    this.tokens = tokens;

                                         }


                                 next() {

    const token = this.nextToken();

    const     o = token && this.parse(token);

      return { value: o, done: !o };

                                       }


                           nextToken() {

    return this.tokens.next().value;

                                       }

                          parse(token) {

                             let o;

                switch (token.type) {

                  case TOK_NUMBER:

              o = token.value;
                  break;

                  case TOK_SYMBOL:

      o = Ṣÿ.for(token.value);
          break;

                 case TOK_KEYWORD:

      o = Ķÿ.for(token.value);
          break;

                         case "(":

         o = this.parseList();
    // o.line = token.line;
  // o.column = token.column;
    // o.file = token.file;
             break;

                          default:

     throw new TokenNoMatchError(token);

                                    }

                             return o;

                                       }


         parseList(list = Ļÿ.make()) {

       const token = this.nextToken();

                            if (token)

            if (token.type === ')')

                    return list;

                               else

    return this.parseList(list)
               .push(this.parse(token));


     throw new UnexpectedEndOfInputError();

                                        }


                    [Symbol.iterator]() {

                          return this;

                                        }

                                             }


const assert = require("assert");

describe("Parser", function () {

  it("parses a symbol", function () {
    const input = "🥚";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ṣÿ.for(input);
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a number", function () {
    const input = "42";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = 42;
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a keyword", function () {
    const input = ":🥚";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ķÿ.for("🥚");
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a list", function() {
    const input = "()";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ļÿ.make();
    // const expect = Bubble.blow();
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a list of numbers", function () {
    const input = "(83 24 3)";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    // const expect = Bubble.blow(83, 24, 3);
    const expect = Ļÿ.make(83, 24, 3);
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a list of symbols", function () {
    const input = "(a b c)";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ļÿ.make(Ṣÿ.for('a'),
            Ṣÿ.for('b'), Ṣÿ.for('c'));
    assert.deepEqual([expect], [...parser]);
  });

  // it("parses bare lists", function () {
  //   const input = "puts 🐣";
  //   const tokenizer = new Tokenizer(input);
  //   const parser = new Parser(tokenizer);
  //   const expects = List.make(Ṣymbol.for("puts"),
  //     Ṣymbol.for("🐣"));
  //   assert.deepEqual([expects], [...parser]);
  // });
});

class NoMatchError extends Error {
  name = "NoMatchError";

  constructor(token){
    super("No match for token " +
      JSON.stringify(token));
  }
}

// const input = "hi-ho";
// const tokenizer = new Tokenizer(input);
// const parser = new Parser(tokenizer);

// for (const expression of parser) {
//   console.log(expression);
// }

