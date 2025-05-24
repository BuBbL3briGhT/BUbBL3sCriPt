const assert = require("assert");
const bubls = require("../../src/bubls");

const { eval } = bubls;

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
    assertEvalTo("(* 1 1)", 1);
    assertEvalTo("(* 1 1 1)", 1);
    assertEvalTo("(* 1 1 2)", 2);
    assertEvalTo("(* 1 2 2)", 4);
    assertEvalTo("(* 2 2 2)", 8);
    assertEvalTo("(* 2 2)", 4);
    assertEvalTo("(* 1 2)", 2);
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

function assertEvalTo(expression, expected) {
  assert.equal(eval(expression), expected,
    expression + " => " + expected);
}

