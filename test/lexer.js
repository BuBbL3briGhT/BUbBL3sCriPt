const assert = require("assert");
const Lexer  = require("../src/lexer");

describe('Lexer', function () {
  describe("#tokenize", function () {
    it("should tokenize a string", function() {
      let lexer = new Lexer;
      lexer.tokenize("(+ 2 3)", function (tokens) {
        // assert.equal(tokens, [
        //     [ '(' ],
        //     [ 'identifier', '+' ],
        //     [ 'number', 2 ],
        //     [ 'number', 3 ],
        //     [ ')' ]
        // ]);
      });
    });
  });
});
