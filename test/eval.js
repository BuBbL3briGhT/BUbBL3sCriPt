const assert = require("assert");
const sinon = require("sinon");
const Bubble = require("../src/bubble");
const Balloon = require("../src/balloon");
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
  it("evaluates a balloon with ease", function () {
    let result = eval("[1 2 3]");
    // console.log(result);
    assert(result instanceof Balloon);
  });
});


