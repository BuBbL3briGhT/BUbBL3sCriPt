const assert = require("assert");
const bubls = require("../src/bubls");

const { eval } = bubls;

describe("bubls", function () {
  it("runs tests", function () {
    assert.equal(1, eval("(- 3 2)"));
  });
});

describe("+", function () {
  it("sums two numbers", function () {
    assert.equal(2, eval("(+ 1 1)"));
  });
});

describe("+", function () {
  it("sums", function () {
    assert.equal(2, eval("(+ 1 1)"));
  });
});
