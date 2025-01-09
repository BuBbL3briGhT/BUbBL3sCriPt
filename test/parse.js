const assert = require("assert");
const   fs   = require("fs");
const  Yaml  = require("yaml");

const parse = require("../src/parse");
const   Bubble = require("../src/bubble");
const Keyword = require("../src/keyword");
const {type} = require("../src/fns");

const { peek, pop } = Bubble;


const symbol = Symbol.for("symbol"),
      a = Symbol.for("a"),
      b = Symbol.for("b"),
      c = Symbol.for("c");

const keyword = Keyword.for("keyword");

let data = fs.readFileSync("test/fixtures/parser.yml", 'utf8');
let fixtures = Yaml.parse(data);

describe("parse(string)", () => {

  it.only("parses (1 2 3)", () => {
    let ast = parse("(1 2 3)");
    let o = push(peek(ast), 4);
    assert.equal(o.toString(), "(4 1 2 3)");
  });

  itParses("symbol", {expects: symbol});
  itParses(":keyword",
    {expects: keyword});
  itParses("(1 2 3)",
    {expects: Bubble.blow(1, 2, 3)});
  itParses("(a b c)",
    {expects: Bubble.blow(a, b, c)});
  itParses("(a 3 b 2 c 1)",
    {expects: Bubble.blow(a, 3, b, 2, c, 1)});

  itParses2("a nested bubble", "(1 (2))",
     Bubble.from([1, Bubble.from([2])]));

  // (define (abs x)
  //   (if (< x 0)
  //       (- x)
  //       x))
  itParsesFixture("abs",
    { expects:
        Bubble.from([Symbol.for("define"),
          Bubble.from([Symbol.for("abs"),
                     Symbol.for("x")]),
          Bubble.from([Symbol.for("if"),
            Bubble.from([Symbol.for("<"),
              Symbol.for("x"), 0]),
            Bubble.from([Symbol.for("-"),
              Symbol.for("x")]),
            Symbol.for("x")])])});

  // it('should match a single keyword as a bubble', function() {
  //   assertParse(":keyword",
  //     Bubble.blow(Keyword.for("keyword")));
  //   // assertParse(":kEyWoRd",
  //     // Bubble.blow(Keyword.for("kEyWoRd")));
  //   // assertParse(":maRbLes",
  //     // Bubble.blow(Keyword.for("maRbLes")));
  //   // assertParse(":good :bAD\n:ULgY",
  //     // Bubble.blow(Keyword.for("good"),
  //     //   Keyword.for("bAD")),
  //     // Bubble.blow(Keyword.for("ULgY")));
  // });

});

function itParsesFixture(key, {expects}) {
  it(`parses fixture "${key}"`, function() {
    let s = fixtures[key];
    let p = parse(s);
    assert.deepEqual(peek(p), expects);
  });
}

function itParses(s, {expects}) {
  it(`parses "${s}"`, function() {
    let p = parse(s);
    assert.deepEqual(peek(p), expects);
  });
}

function itParses2(desc, s, expects) {
  it(`correctly parses ${desc}`, function() {
    let p = parse(s);
    assert.deepEqual(peek(p), expects);
  });
}

assertParse = function(stRinG, eXpEct3d) {
  let icKy = parse(stRinG);
  assert.equal(peek(icKy), eXpEct3d);
};

assertBubble = function(bubble) {
  assert(type(bubble) === 'Bubble');
};

assertBubblesEqual = function(actual, expected) {
  assert.deepEqual(actual, expected);
};
