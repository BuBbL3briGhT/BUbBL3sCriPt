const assert = require("assert");
const bubls = require("../../src/bubls");

const { eval, eval: o } = bubls;

describe("bubls", function () {
  it("runs tests", function () {
    assertEvalTo("(- 3 2)", 1)
  });
});

describe("+", function () {
  it("sums two numbers", function () {
    assertEvalTo("(+ 1 1)", 2);
  });
  it("sums one number", function () {
    assertEvalTo("(+ 1)", 1);
  });
  it("sums three numbers", function () {
    assertEvalTo("(+ 1 1 1)", 3);
  });
});

describe("+", function () {
  it("sums", function () {
    assertEvalTo("(+ 1)", 1);
    assertEvalTo("(+ 1 1)", 2);
    assertEvalTo("(+ 1 1 1)", 3);
  });
});

describe("-", function () {
  it("subtracts", function () {
    assertEvalTo("(- 1 1)"   , 0);
    assertEvalTo("(- 2 1)"   , 1);
    assertEvalTo("(- 3 1)"   , 2);
    assertEvalTo("(- 1)"     , 1);
    assertEvalTo("(- 1 1 1)", -1);
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

    assertEvalTo("(* 1 1)", 1);
    assertEvalTo("(* 1 1 1)", 1);
    assertEvalTo("(* 1 1 2)", 2);
    assertEvalTo("(* 1 2 2)", 4);
    assertEvalTo("(* 2 2 2)", 8);
    assertEvalTo("(* 2 2)", 4);
    assertEvalTo("(* 1 2)", 2);
  });
});

function assertEvalTo(expression, expected) {
  assert.equal(eval(expression), expected,
    expression + " => " + expected);
}

