const assert = require("assert");
const bubls = require("../src/bubls");
const { eval } = bubls;

describe("bubls", function () {
  it("runs tests", function () {
    assert.equal(1, eval("(- 3 2)"));
  });
});

