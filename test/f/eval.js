const assert = require("assert");
const sinon = require("sinon");
const Bubbles = require("../../src/o/bubbles");
const List = require("../../src/o/list");
const eval = require("../../src/f/eval");

describe("eval(script)", function () {

  afterEach(function () {
    sinon.restore();
  });


  it("runs script top to bottom", function () {
    sinon.replace(console, "log", sinon.fake())
    eval("(muf puts (fn [a] (console.log a)))\n(puts 1)\n(puts 2)\n(puts 3)")
    // eval("(puts 3)\n(puts 2)\n(puts 1)\n(muf puts (fn [a] (console.log a)))"); // fyi: Pass with this under reverse execution.
    assert(console.log.calledWith(1));
    assert(console.log.calledWith(2));
    assert(console.log.calledWith(3));
  });

  it("evaluates bubblescript", function () {
    assert.equal(eval("(+ 45 87)"), 132);
  });

  it("can console.log", function () {
    sinon.replace(console, "log", sinon.fake())
    eval('(console.log "Bonjour Marbre")');
    assert(console.log.calledWith("Bonjour Marbre"));
  });

  it("evaluates a vector with ease", function () {
    let result = eval("[1 2 3]");
    // console.log(result);
    assert(result instanceof List);
  });

});


