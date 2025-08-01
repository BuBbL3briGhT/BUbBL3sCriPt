const assert = require("assert");
const sinon = require("sinon");

const { List, Vector, eval: _eval, parse,
  rootBinding } =
  require("../../src/BubbleScript");

describe("eval(script)", function () {

  afterEach(function () {
    sinon.restore();
  });

  it("runs script top to bottom", function () {
    sinon.replace(console, "log", sinon.fake())
    _eval("(muf puts (fn [a] (console.log a))) (puts 1) (puts 2) (puts 3)")
    // _eval("(puts 3)\n(puts 2)\n(puts 1)\n(muf puts (fn [a] (console.log a)))"); // fyi: Pass with this under reverse execution.
    assert(console.log.calledWith(1));
    assert(console.log.calledWith(2));
    assert(console.log.calledWith(3));
  });

  it("evaluates listcript", function () {
    assert.equal(_eval("(+ 45 87)"), 132);
  });

  it("can console.log", function () {
    sinon.replace(console, "log", sinon.fake())
    _eval('(console.log "Bonjour Marbre")');
    assert(console.log.calledWith("Bonjour Marbre"));
  });

  it("evaluates a vector with ease", function () {
    let result = _eval("[1 2 3]");
    // console.log(result);
    assert(result instanceof Vector);
  });

  it("expands a macro", function () {
    let bnd = Object.create(rootBinding);
    let ast = parse("(muf 🐒 (macro [] °(puts \"Monkey\")))");
    assert.equal(ast.toString(), "((muf 🐒 (macro [] °(puts \"Monkey\"))))");
    ast.eval(bnd)
    let fn = parse("(fn [] (🐒))").eval(bnd);
    assert.equal(fn.body.toString(), "((🐒))");
    fn.body.eval(bnd);
    assert.equal(fn.body.toString(), "((puts \"Monkey\"))");
    fn.body.eval(bnd);
    assert.equal(fn.body.toString(), "((puts \"Monkey\"))");
  });

  it("expands a macro a more complex macro", function () {
    let bnd = Object.create(rootBinding);
    bnd.puts = null;
    let ast = parse("(muf 🐒 (macro [🐸 🐷 🦎] (list °puts (list °+ 🐸 🐷 🦎)) (list °puts (+ 🐸 🐷 🐷) 🦎)))");
    assert.equal(ast.toString(), "((muf 🐒 (macro [🐸 🐷 🦎] (list °puts (list °+ 🐸 🐷 🦎)) (list °puts (+ 🐸 🐷 🐷) 🦎))))");
    ast.eval(bnd)
    let fn = parse("(fn [🪻] (* 6 9) (🐒 1 2 🪻) (+ 3 4))").eval(bnd);
    assert.equal(fn.body.toString(), "((* 6 9) (🐒 1 2 🪻) (+ 3 4))");
    fn.body.eval(bnd);
    assert.equal(fn.body.toString(), "((* 6 9) (puts (+ 1 2 🪻)) (puts 5 🪻) (+ 3 4))");
  });
});

