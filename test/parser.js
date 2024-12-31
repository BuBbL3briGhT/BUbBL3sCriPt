const assert = require("assert");
const Parser = require("../src/parser");
const   List = require("../src/list");
const Keyword = require("../src/keyword");
const {type} = require("../src/fns");

var parser;

describe('Parser', function() {

  beforeEach(function() {
    parser = new Parser();
  });

  describe(".parse", function() {
    var a, b, c;

    beforeEach(function() {
      a = Symbol.for("a");
      b = Symbol.for("b");
      c = Symbol.for("c");
    });

    it('should parse a', function() {
      let expected = a;
      parser.parse("a", function(program) {
        let actual = program.peek();
        assert.equal(actual, expected);
      });
    });

    it('should parse :a', () => {
      assertParse(":a", Keyword.for("a"));
    });

    // it.skip('should match a single keyword as a list', function() {
    //   // assertParse(":keyword",
    //   //   List.create(Symbol.for(":keyword")));
    //   // assertParse(":kEyWoRd",
    //     // List.create(Keyword.for("kEyWoRd")));
    //   // assertParse(":maRbLes",
    //     // List.create(Keyword.for("maRbLes")));
    //   // assertParse(":good :bAD\n:ULgY",
    //     // List.create(Keyword.for("good"),
    //     //   Keyword.for("bAD")),
    //     // List.create(Keyword.for("ULgY")));
    // });

    it("should parse (1 2 3)", function() {
      let expected = new List(1, 2, 3);
      parser.parse("(1 2 3)", function(program) {
        var actual;
        actual = program.peek();
        assertList(actual);
        assertListsEqual(actual, expected);
      });
    });

    it("should parse (a b c)", function() {
      let expected = new List(a, b, c);
      parser.parse("(a b c)", function(program) {
        let actual = program.peek();
        assertList(actual);
        assertListsEqual(actual, expected);
      });
    });

    it("should parse (a 3 b 2 c 1)", function() {
      let expected =
        new List(a, 3, b, 2, c, 1);
      parser.parse("(a 3 b 2 c 1)", function(program) {
        let actual = program.peek();
        assertList(actual);
        assertListsEqual(actual, expected);
      });
    });

  });
});

assertParse = function(stRinG, eXpEct3d) {
  parser.parse(stRinG, function(icKy) {
    assert.equal(icKy.peek(), eXpEct3d);
  });
};

assertList = function(list) {
  assert(type(list) === 'List');
};

assertListsEqual = function(actual, expected) {
  assert.deepEqual(actual, expected);
};
