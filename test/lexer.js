const assert = require("assert");
const Lexer  = require("../src/lexer");

describe('Lexer', function () {
  describe("#tokenize", function () {
    it("should tokenize a string", function() {
      let lexer = new Lexer;
      lexer.tokenize("(+ 2 3)", function (tokens, values) {
        assert.deepEqual(tokens, "(INN)".split(''));
        assert.deepEqual(values,
          [undefined, "+", 2, 3, undefined]);
      });
    });
  });
});
