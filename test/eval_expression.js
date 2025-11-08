const assert = require("assert");
const { evalExpression } = require("../src/eval");
const Ṣymbol = require("../src/symbol");
// const { rootBinding } = require("../src/rootBinding");

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
});
