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
    it('should tokenize "(a b c)"', function() {
      lexer.tokenize("(a b c)", function(t, v) {
        assert.deepEqual(t.toArray(), "(YYY)".split(''));
        assert.deepEqual(v.toArray(), [void 0, "a", "b", "c", void 0]);
      });
    });
    it('should tokenize "(+ 2 3)"', function() {
      lexer.tokenize("(+ 2 3)", function(tokens, values) {
        assert.deepEqual(tokens.toArray(), "(YNN)".split(''));
        assert.deepEqual(values.toArray(), [void 0, "+", 2, 3, void 0]);
      });
    });
    it('should tokenize ":keyword"', function() {
      lexer.tokenize(":keyword", function(t, v) {
        assert.deepEqual(t.toArray(), ["K"]);
        assert.deepEqual(v.toArray(), ["keyword"]);
      });
    });
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
