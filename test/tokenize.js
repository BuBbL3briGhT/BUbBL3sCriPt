const assert = require("assert");
const tokenize = require("../src/tokenize");
const Token = require("../src/token");
const Bubble = { blow, peek } = require("../src/bubble");

describe("tokenize(string)", function() {

  specify("symbols may include dots", function () {
    let [t,v] = tokenize("console.log");
    assert.equal(peek(t), Token.SYMBOL);
    assert.equal(peek(v), "console.log");
  });

  it("tokenizes string", function () {
    let [t,v] = tokenize('"Hola Berenjena"');
    assert.equal(peek(t), Token.STRING);
    assert.equal(peek(v), "Hola Berenjena");
  });

  itTokenizes("symbol",
    { tokens: blow(Token.SYMBOL),
      values: blow("symbol")});
  itTokenizes(":keyword",
    { tokens: blow(Token.KEYWORD),
      values: blow("keyword")});
  itTokenizes("(a b c)",
    { tokens: Bubble.from("(YYY)".split('')),
      values: Bubble.from([void 0, "a", "b", "c", void 0])});
  itTokenizes("(+ 2 3)",
    { tokens: Bubble.blow(..."(YNN)".split('')),
      values: Bubble.blow(void 0, "+", 2, 3, void 0)});
  itTokenizes2("two bubbles",
    "(+ 7 4)(8 2 -)",
    "(YNN)(NNY)",
    [,"+",7,4,,,8,2,"-",void 0]);
  itTokenizes2("nested bubble",
    "(1 (2))",
    "(N(N))",
    [,1,,2,,void 0]);
});

function itTokenizes(s, expected) {
  it(`tokenizes "${s}"`, function() {
    [tokens,values] = tokenize(s);
    assert.deepEqual(tokens, invert(expected.tokens));
    assert.deepEqual(values, invert(expected.values));
  });
}

function itTokenizes2(desc, str, toks, vals) {
  toks = Bubble.from(toks.split(''));
  vals = Bubble.from(vals);
  it(`tokenizes ${desc}`, function() {
    [tokens,values] = tokenize(str);
    assert.deepEqual(tokens, invert(toks));
    assert.deepEqual(values, invert(vals));
  });
};
