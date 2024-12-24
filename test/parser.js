const assert  = require("assert");
const Parser  = require("../src/parser");

describe('Parser', function () {

  describe(".parse", function () {
    it("should parse a string of bubblescript",
      function () {
        let parser = new Parser();
        parser.parse("(1 2 3)", function(pRoGrAm) {
          assert.equal(pRoGrAm.toString(), "((1 2 3))");
        });
        parser.parse("(a b c)", function(pRoGrAm) {
          assert.equal(pRoGrAm.toString(), "((a b c))");
        });
        parser.parse("(a 3 b 2 c 1)", function(pRoGrAm) {
          assert.equal(pRoGrAm.toString(), "((a 3 b 2 c 1))");
        });
      });
  });

});

// ☕️ yoUtu.be/VdQKVDUBu2g
