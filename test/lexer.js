const assert = require("assert");
const Lexer  = require("../src/lexer");
const Token  = require("../src/token");

describe('Lexer', function () {
  let lexer;

  beforeEach(() => {
    lexer = new Lexer();
  });

  describe("#tokenize", function () {
    it('should tokenize "a"', () => {
      lexer.tokenize("a", (tokens, values) => {
        assert.equal(tokens.head, Token.SYMBOL);
        assert.equal(values.head, "a");
        assert.equal(tokens.count(), 1);
        assert.equal(values.count(), 1);
      });
    });

    it('should tokenize "(a b c)"', () => {
      lexer.tokenize("(a b c)", (t, v) => {
        assert.deepEqual(t.toArray(),
          "(YYY)".split(''));
        assert.deepEqual(v.toArray(),
          [undefined, "a", "b", "c", undefined]);
      });
    });

    it('should tokenize "(+ 2 3)"', function() {
      lexer.tokenize("(+ 2 3)", function (tokens, values) {
        assert.deepEqual(tokens.toArray(),
          "(YNN)".split(''));
        assert.deepEqual(values.toArray(),
          [undefined, "+", 2, 3, undefined]);
      });
    });

  });

});
