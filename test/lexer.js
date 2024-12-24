const assert = require("assert");
const Lexer  = require("../src/lexer");

describe('Lexer', function () {
  describe("#tokenize", function () {
    it("should tokenize a string", function() {
      let lexer = new Lexer;
      lexer.tokenize("(+ 2 3)", function (tokens, values) {
        assert.deepEqual(tokens.toArray(),
          "(YNN)".split(''));
        assert.deepEqual(values.toArray(),
          [undefined, "+", 2, 3, undefined]);
      });
    });
  });
});
