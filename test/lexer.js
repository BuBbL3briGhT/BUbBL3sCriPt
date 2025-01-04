const assert = require("assert");
const Lexer = require("../src/lexer");
const Token = require("../src/token");
const Bubble = require("../src/bubble");

const lexer = new Lexer();

describe('Lexer', function() {
  describe("#tokenize", function() {
    itTokenizes("symbol",
      { tokens: Bubble.blow(Token.SYMBOL),
        values: Bubble.blow("symbol")});
    itTokenizes(":keyword",
      { tokens: Bubble.blow(Token.KEYWORD),
        values: Bubble.blow("keyword")});
    itTokenizes("(a b c)",
      { tokens: Bubble.from("(YYY)".split('')),
        values: Bubble.from([void 0, "a", "b", "c", void 0])});
    itTokenizes("(+ 2 3)",
      { tokens: Bubble.blow(..."(YNN)".split('')),
        values: Bubble.blow(void 0, "+", 2, 3, void 0)});
    itTokenizes2("two bubbles",
      "(+ 7 4)(8 2 -)",
      "(YNN)(NNY)",
      [,"+",7,4,,,8,2,"-",void 0])

    itTokenizes2("nested bubble",
      "(1 (2))",
      "(N(N))",
      [,1,,2,,void 0])

    // context("in case of an error", function () {
    //   it("passes error to the callback as the first parameter", function () {
    //     lexer.tokenizes
    //   });
    // });

  });
});

function itTokenizes(s, expected) {
  it(`correctly tokenizes "${s}"`, function() {
    lexer.tokenize(s, function(err, tokens, values) {
      if (err)
        throw err;
      assert.deepEqual(tokens, expected.tokens);
      assert.deepEqual(values, expected.values);
    });
  });
}

function itOnlyTokenizes(s, expected) {
  it.only(`correctly tokenizes "${s}"`, function() {
    lexer.tokenize(s, function(err, tokens, values) {
      if (err)
        throw err;
      assert.deepEqual(tokens, expected.tokens);
      assert.deepEqual(values, expected.values);
    });
  });
}
function itTokenizes2(desc, str, toks, vals) {
  toks = Bubble.from(toks.split(''));
  vals = Bubble.from(vals);
  it(`correctly tokenizes ${desc}`, function() {
    lexer.tokenize(str, function(err, tokens, values) {
      if (err)
        throw err;
      assert.deepEqual(tokens, toks);
      assert.deepEqual(values, vals);
    });
  });
}
