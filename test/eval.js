const assert = require("assert");
const sinon = require("sinon");

// const List = require("../src/list");
// const Vector = require("../src/vector");
// const rootBinding = require("../src/root_binding");

// const { ėval } = require("../src/eval");

const { List, Vector, rootBinding,
  ėval, ëval, parse, Keyword } =
  require("../src/BubbleScript");

describe("eval(script)", function () {

  afterEach(function () {
    sinon.restore();
  });

  it("evaluates a keyword", function() {
    const p = parse(":keyword");
    assert.equal(ëval({}, p),
      Keyword.for("keyword"));
  });

  it("runs script top to bottom", function () {
    sinon.replace(console, "log", sinon.fake())
    // ėval("(muf puts (fn [a] (console.log a))) " +
    //      "(puts 1) (puts 2) (puts 3)");
    ėval("(muf puts (fn [a] (console.log a)))\n" +
         "(puts 1)\n(puts 2)\n(puts 3)");
    // ėval("(puts 1)\n(puts 2)\n(puts 3)");
    // ėval("(puts 3)\n(puts 2)\n(puts 1)\n(muf puts (fn [a] (console.log a)))"); // fyi: Pass with this under reverse execution.
    assert(console.log.calledWith(1));
    assert(console.log.calledWith(2));
    assert(console.log.calledWith(3));
  });

  it("evaluates BubbleScript", function () {
    assert.equal(ėval("(+ 45 87)"), 132);
  });

  it("can console.log", function () {
    sinon.replace(console, "log", sinon.fake())
    ėval('(console.log "Bonjour Marbre")');
    assert(console.log.calledWith("Bonjour Marbre"));
  });

  it("evaluates a vector with ease", function () {
    let result = ėval("[1 2 3]");
    assert(result instanceof Vector);
  });

  it.only("expands a macro", function () {
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

  describe("function parameters", function () {
    it("splats", function () {
      assert.equal(ėval(
        "((fn [a b c] (list b c a)) 1 2 3)")
          .toString(), "(2 3 1)");
      assert.equal(ėval(
        "((fn [a & b] (list a b)) 1 2 3)")
          .toString(), "(1 (2 3))");
      assert.equal(ėval(
        "((fn [& a] (send a :pop)) 1 2 3)")
          .toString(), "(2 3)");
      // assert.equal(ėval(
      //   "((fn [& a] (pop a)) 1 2 3)")
      //     .toString(), "(2 3)");
      // assert.equal(ėval(
      //   "((fn [a b & c] (list & c)) 1 2 3)")
      //     .toString(), "(3)");
    });
    it("destructures", function () {
      assert.equal(ėval(
        "((fn [a b] (list a b b)) 1 [2 3])")
          .toString(), "(1 [2 3] [2 3])");
      assert.equal(ėval(
        "((fn [a [b c]] (list a b c)) 1 [2 3])")
          .toString(), "(1 2 3)");
    });
    it("splats for outbound functions");
      // What i mean by outbound function is a
    // function like console.log. This takes a
    // different code path than inbound
    // function. There are a number of subtle
    // differnces about where functions live and
    // how the are define, or what the are
    // composed of, which we are going to need
    // to dig into identify and probably
    // classify in order to make the system
    // that much more robust.
      // assert.equal(ėval(
      //   "((fn [a b & c] (console.log & c)) 1 2 3)")
      //     .toString(), "(3)");
    it("splats for inbound functions");
      // assert.equal(ėval(
      //   "((fn [a b & c] (list & c)) 1 2 3)")
      //     .toString(), "(3)");
  });
});

