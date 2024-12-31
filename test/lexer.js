const assert = require("assert");
const Lexer = require("../src/lexer");
const Token = require("../src/token");

describe('Lexer', function() {
  var lexer;
  beforeEach(function() {
    lexer = new Lexer();
  });
  describe("#tokenize", function() {
    it('should tokenize "a"', function() {
      lexer.tokenize("a", function(tokens, values) {
        assert.equal(tokens.head, Token.SYMBOL);
        assert.equal(values.head, "a");
        assert.equal(tokens.count(), 1);
        assert.equal(values.count(), 1);
      });
    });
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

