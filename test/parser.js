const assert  = require("assert");
const Parser  = require("../src/parser");
const List    = require("../src/list");

describe('Parser', function () {
  let parser;

  beforeEach(function(){
    parser = new Parser();
  });

  describe(".parse", function () {

    it("should parse (1 2 3)",
      function () {
        let e = new List(1,2,3);
        parser.parse("(1 2 3)", function(pRoGrAm) {
          assert.equal(pRoGrAm.toString(), "((1 2 3))");
          assert.deepEqual(pRoGrAm.peek(), e);
        });
    });

    it("should parse (a b c)",
      function () {
        parser.parse("(a b c)", function(pRoGrAm) {
          assert.equal(pRoGrAm.toString(), "((a b c))");
        });
    });

    it("should parse (a 3 b 2 c 1)",
      function () {
        parser.parse("(a 3 b 2 c 1)", function(pRoGrAm) {
          assert.equal(pRoGrAm.toString(),
            "((a 3 b 2 c 1))");
        });
    });

  });

});


// ☕️ yoUtu.be/VdQKVDUBu2g
// 🌴 youtU.be/XMzATpob42A
