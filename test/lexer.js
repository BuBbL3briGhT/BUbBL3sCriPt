const assert = require("assert");
const Lexer = require("../src/lexer");
const Token = require("../src/token");
const List = require("../src/list");

const lexer = new Lexer();

describe('Lexer', function() {
  describe("#tokenize", function() {
    itTokenizes("symbol",
      { tokens: List.create(Token.SYMBOL),
        values: List.create("symbol")});
    itTokenizes(":keyword",
      { tokens: List.create(Token.KEYWORD),
        values: List.create("keyword")});
    itTokenizes("(a b c)",
      { tokens: List.from("(YYY)".split('')),
        values: List.from([void 0, "a", "b", "c", void 0])});
    itTokenizes("(+ 2 3)",
      { tokens: List.from("(YNN)".split('')),
        values: List.from([void 0, "+", 2, 3, void 0])});
    itTokenizes2("two lists",
      "(+ 7 4)(8 2 -)",
      "(YNN)(NNY)",
      [,"+",7,4,,,8,2,"-",void 0])

    itTokenizes2("nested list",
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

function itTokenizes2(desc, str, toks, vals) {
  toks = List.from(toks.split(''));
  vals = List.from(vals);
  it(`correctly tokenizes ${desc}`, function() {
    lexer.tokenize(str, function(err, tokens, values) {
      if (err)
        throw err;
      assert.deepEqual(tokens, toks);
      assert.deepEqual(values, vals);
    });
  });
}
