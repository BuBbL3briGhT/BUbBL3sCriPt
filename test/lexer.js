var Lexer, Token, assert;

assert = require("assert");

Lexer = require("../src/lexer");

Token = require("../src/token");

describe('Lexer', function() {
  var lexer;
  lexer = null;
  beforeEach(function() {
    return lexer = new Lexer();
  });
  return describe("#tokenize", function() {
    it('should tokenize "a"', function() {
      return lexer.tokenize("a", function(tokens, values) {
        assert.equal(tokens.head, Token.SYMBOL);
        assert.equal(values.head, "a");
        assert.equal(tokens.count(), 1);
        return assert.equal(values.count(), 1);
      });
    });
    it('should tokenize "(a b c)"', function() {
      return lexer.tokenize("(a b c)", function(t, v) {
        assert.deepEqual(t.toArray(), "(YYY)".split(''));
        return assert.deepEqual(v.toArray(), [void 0, "a", "b", "c", void 0]);
      });
    });
    return it('should tokenize "(+ 2 3)"', function() {
      return lexer.tokenize("(+ 2 3)", function(tokens, values) {
        assert.deepEqual(tokens.toArray(), "(YNN)".split(''));
        return assert.deepEqual(values.toArray(), [void 0, "+", 2, 3, void 0]);
      });
    });
  });
});

