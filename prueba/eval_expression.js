const assert = require("assert");
const { evalExpression } = require("../src/eval");
const Ṣymbol = require("../src/symbol");
const Bubble = require("../src/bubble");
const List = require("../src/list");
const { rootBinding } = require("../src/root_binding");

describe("evalExpression", function () {
  it("evaluates an expression", function () {
    const result = evalExpression(null, 1);
    assert.equal(result, 1);
  });

  it("evaluates a Ṣymbol", function () {
    const binding = { a: "Apple" };
    const symbol = Ṣymbol.for("a");
    const result = evalExpression(binding, symbol);
    assert.equal(result, "Apple");
  });

  it("evaluates a Bubble", function () {
    const bubble = new Bubble(2);
    const result = evalExpression(null, bubble);
    assert.equal(result, 2);
  });

  it("evaluates a List", function () {
    const list = List.blow(Ṣymbol.for("+"), 1, 2);
    const result = evalExpression(rootBinding, list);
    assert.equal(result, 3);
  });
});
