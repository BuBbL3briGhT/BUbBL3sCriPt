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
  });
});

function itTokenizes(s, expected) {
  it(`correctly tokenizes "${s}"`, function() {
    lexer.tokenize(s, function(tokens, values) {
      assert.deepEqual(tokens, expected.tokens);
      assert.deepEqual(values, expected.values);
    });
  });
}
