const assert = require("assert");
const bubls = require("../../src/bubls");

const { eval } = bubls;

describe("bubls", function () {
  it("runs tests", function () {
    assertEval("(- 3 2)", 1)
  });
});

describe("+", function () {
  it("sums two numbers", function () {
    assertEval("(+ 1 1)", 2);
  });
  it("sums one number", function () {
    assertEval("(+ 1)", 1);
  });
  it("sums three numbers", function () {
    assertEval("(+ 1 1 1)", 3);
  });
});

describe("+", function () {
  it("sums", function () {
    assertEval("(+ 1)", 1);
    assertEval("(+ 1 1)", 2);
    assertEval("(+ 1 1 1)", 3);
  });
});

describe("-", function () {
  it("subtracts", function () {
    assertEval("(- 1 1)"   , 0);
    assertEval("(- 2 1)"   , 1);
    assertEval("(- 3 1)"   , 2);
    assertEval("(- 1)"     , 1);
    assertEval("(- 1 1 1)", -1);
  });
});

describe("*", function () {
  it("multiplies", function () {
    assertEval("(* 1 1)", 1);
    assertEval("(* 1 1 1)", 1);
    assertEval("(* 1 1 2)", 2);
    assertEval("(* 1 2 2)", 4);
    assertEval("(* 2 2 2)", 8);
    assertEval("(* 2 2)", 4);
    assertEval("(* 1 2)", 2);
  });
});

describe("/", function () {
  it("divides", function () {
    assertEval("(/ 1 1)", 1);
    assertEval("(/ 1 2)", .5);
    assertEval("(/ 1 2 3)", 0.16666666666666666);
  });
});

function assertEval(expression, expected) {
  assert.equal(eval(expression), expected,
    expression + " => " + expected);
}
