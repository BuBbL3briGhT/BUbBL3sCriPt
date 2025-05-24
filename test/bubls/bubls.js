const assert = require("assert");
const bubls = require("../../src/bubls");

const { eval, eval: o } = bubls;

describe("bubls", function () {
  it("runs tests", function () {
    assert.equal(1, eval("(- 3 2)"));
  });
});

describe("+", function () {
  it("sums two numbers", function () {
    assert.equal(2, eval("(+ 1 1)"));
  });
  it("sums one number", function () {
    assert.equal(1, eval("(+ 1)"));
  });
  it("sums three numbers", function () {
    assert.equal(3, eval("(+ 1 1 1)"));
  });
});

describe("+", function () {
  it("sums", function () {
    assert.equal(1, eval("(+ 1)"));
    assert.equal(2, eval("(+ 1 1)"));
    assert.equal(3, eval("(+ 1 1 1)"));
  });
});

describe("-", function () {
  it("subtracts", function () {
    assert.equal( 0, eval("(- 1 1)"));
    assert.equal( 1, eval("(- 2 1)"));
    assert.equal( 2, eval("(- 3 1)"));
    assert.equal( 1, eval("(- 1)"));
    assert.equal(-1, eval("(- 1 1 1)"));
  });
});

describe("*", function () {
  it("multiplies", function () {
    assert.equal(1, o("(* 1 1)"));
    assert.equal(1, o("(* 1 1 1)"));
    assert.equal(2, o("(* 1 1 2)"));
    assert.equal(4, o("(* 1 2 2)"));
    assert.equal(8, o("(* 2 2 2)"));
    assert.equal(4, o("(* 2 2)"));
    assert.equal(2, o("(* 2)"));
  });
});
