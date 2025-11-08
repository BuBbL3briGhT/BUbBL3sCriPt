const assert = require("assert");
const { evalExpression } = require("../src/eval");
// const { rootBinding } = require("../src/rootBinding");

describe("evalExpression", function () {
  it("evaluates an expression", function () {
    const result = evalExpression(null, 1);
    assert.equal(result, 1);
  });
});
