const assert = require("assert");
const Bubble = require("../src/bubble");
const eval = require("../src/eval");

describe("eval(script)", function () {
  it.skip("evaluates bubblescript", function () {
    assert.equal(eval("(+ 45 87)"), 132);
  });
});


