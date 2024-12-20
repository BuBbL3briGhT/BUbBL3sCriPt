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
      });
  });

});

// ☕️ yoUtu.be/VdQKVDUBu2g
