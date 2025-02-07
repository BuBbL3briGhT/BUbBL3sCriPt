const assert = require("assert");
const tokenize = require("../src/tokenize");
const Bubble = { blow, count, get, peek } = require("../src/bubble");

const { TOK_STRING, TOK_NUMBER,
  TOK_SYMBOL, TOK_KEYWORD } = tokenize;

describe("tokenize(string)", function() {

  it("allows dots in symbols", function () {
    let [t,v] = tokenize("console.log");
    assert.equal(peek(t), TOK_SYMBOL);
    assert.equal(peek(v), "console.log");
  });

  it("tokenizes single quote", function () {
    let [t,v] = tokenize("'");
    assert.equal(peek(t), "'");
  });

  it("eats comments", function () {
    let [t,v] = tokenize("# Hamilton Burger");
    assert.equal(peek(t), undefined);
    assert.equal(peek(v), undefined);
    [t,v] = tokenize("# 🍔4\ncop");
    assert.equal(peek(t), "Y");
    assert.equal(peek(v), "cop");
  });

  it("tokenizes string", function () {
    let [t,v] = tokenize('"Hola Berenjena"');
    assert.equal(peek(t), TOK_STRING);
    assert.equal(peek(v), "Hola Berenjena");
  });

  it("tokenizes bubbles", function () {
    let [t,v] = tokenize('(777 kitty :dawg)');
    assert.equal(peek(t), ")");
    assert.equal(count(t), 5);
  });

  it("tokenizes balloons", function () {
    let [t,v] = tokenize('[sha yaya daya]');
    assert.equal(count(t), 5);
    assert.equal(peek(t), ']');
    assert.equal(peek(v), undefined);
    assert.equal(get(t, 1), TOK_SYMBOL);
    assert.equal(get(v, 1), 'daya');
    assert.equal(get(t, 2), TOK_SYMBOL);
    assert.equal(get(v, 2), 'yaya');
    assert.equal(get(t, 3), TOK_SYMBOL);
    assert.equal(get(v, 3), 'sha');
    assert.equal(get(t, 4), '[');
    assert.equal(get(v, 4), undefined);
  });


  itTokenizes("symbol",
    { tokens: blow(TOK_SYMBOL),
      values: blow("symbol")});
  itTokenizes(":keyword",
    { tokens: blow(TOK_KEYWORD),
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
