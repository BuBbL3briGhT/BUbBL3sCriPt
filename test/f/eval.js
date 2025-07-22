const assert = require("assert");
const sinon = require("sinon");
const List = require("../../src/o/list");
const Vector = require("../../src/o/vector");
const eval = require("../../src/f/eval");

const parse = require("../../src/f/parse");
const rootBinding = require("../../src/o/root_binding");

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

  it("evaluates listcript", function () {
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
    assert(result instanceof Vector);
  });

  it("expands macros", function () {
    let _eval = eval.eVaL;
    let bnd = Object.create(rootBinding);
    let ast = parse("(muf 🐒 (macro [] °(puts \"Monkey\")))");
    assert.equal(ast.toString(), "((muf 🐒 (macro [] °(puts \"Monkey\"))))");
    ast.evalEach(bnd)
    let fn = parse("(fn [] (🐒))").evalEach(bnd);
    assert.equal(fn.body.toString(), "((🐒))");
    fn.body.evalEach(bnd);
    assert.equal(fn.body.toString(), "((puts \"Monkey\"))");
    fn.body.evalEach(bnd);
    assert.equal(fn.body.toString(), "((puts \"Monkey\"))");
  });

});

