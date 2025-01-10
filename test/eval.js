const assert = require("assert");
const Bubble = require("../src/bubble");
const eval = require("../src/eval");

describe("eval(script)", function () {
  it("evaluates bubblescript", function () {
    assert.equal(eval("(+ 45 87)"), 132);
  });
  it.only("can console.log", function () {
    eval('(console.log "Bonjour Marbre")');
  });
});


