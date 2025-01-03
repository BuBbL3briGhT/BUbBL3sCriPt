const assert = require("assert");
const   fs   = require("fs");
const  YAML  = require("yaml");

const Parser = require("../src/parser");
const   List = require("../src/list");
const Keyword = require("../src/keyword");
const {type} = require("../src/fns");

const parser = new Parser;

const symbol = Symbol.for("symbol"),
      a = Symbol.for("a"),
      b = Symbol.for("b"),
      c = Symbol.for("c");

const keyword = Keyword.for("keyword");
var fixtures;

describe('Parser', function() {

  before(function()  {
    data = fs.readFileSync("test/fixtures/parser.yml", 'utf8');
    fixtures = YAML.parse(data);
  });

  describe("#parse", function() {

    itParses("symbol", {expects: symbol});
    itParses(":keyword",
      {expects: keyword});
    itParses("(1 2 3)",
      {expects: List.create(1, 2, 3)});
    itParses("(a b c)",
      {expects: List.create(a, b, c)});
    itParses("(a 3 b 2 c 1)",
      {expects: List.create(a, 3, b, 2, c, 1)});

    itParses2("a nested list", "(1 (2))",
       List.from([1, List.from([2])]));

    // (define (abs x)
    //   (if (< x 0)
    //       (- x)
    //       x))
    itParsesFixture("abs",
      { expects:
          List.from([Symbol.for("define"),
            List.from([Symbol.for("abs"),
                       Symbol.for("x")]),
            List.from([Symbol.for("if"),
              List.from([Symbol.for("<"),
                Symbol.for("x"), 0]),
              List.from([Symbol.for("-"),
                Symbol.for("x")]),
              Symbol.for("x")])])});

    // it('should match a single keyword as a list', function() {
    //   assertParse(":keyword",
    //     List.create(Keyword.for("keyword")));
    //   // assertParse(":kEyWoRd",
    //     // List.create(Keyword.for("kEyWoRd")));
    //   // assertParse(":maRbLes",
    //     // List.create(Keyword.for("maRbLes")));
    //   // assertParse(":good :bAD\n:ULgY",
    //     // List.create(Keyword.for("good"),
    //     //   Keyword.for("bAD")),
    //     // List.create(Keyword.for("ULgY")));
    // });

  });
});

function itParsesFixture(key, {expects}) {
  it(`correctly parses fixture "${key}"`, function() {
    let s = fixtures[key];
    parser.parse(s, function(error, p) {
      if (error) {
        console.log(s);
        throw error;
      }
      assert.deepEqual(p.peek(), expects);
    });
  });
}

function itParses(s, {expects}) {
  it(`correctly parses "${s}"`, function() {
    parser.parse(s, function(err, p) {
      if (err)
        throw err;
      assert.deepEqual(p.peek(), expects);
    });
  });
}

function itParses2(desc, s, expects) {
  it(`correctly parses ${desc}`, function() {
    parser.parse(s, function(err, p) {
      if (err)
        throw err;
      assert.deepEqual(p.peek(), expects);
    });
  });
}

assertParse = function(stRinG, eXpEct3d) {
  parser.parse(stRinG, function(err, icKy) {
    if (err)
      return err;
    assert.equal(icKy.peek(), eXpEct3d);
  });
};

assertList = function(list) {
  assert(type(list) === 'List');
};

assertListsEqual = function(actual, expected) {
  assert.deepEqual(actual, expected);
};
