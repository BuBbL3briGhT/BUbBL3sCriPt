const assert = require("assert");
const sinon = require("sinon");
const Bubble = require("../src/bubble");
const eval = require("../src/eval");

describe("eval(script)", function () {
  after(function () {
    sinon.restore();
  });
  it("evaluates bubblescript", function () {
    assert.equal(eval("(+ 45 87)"), 132);
  });
  it("can console.log", function () {
    sinon.replace(console, "log", sinon.fake())
    eval('(console.log "Bonjour Marbre")');
    assert(console.log.calledWith("Bonjour Marbre"));
  });
});


