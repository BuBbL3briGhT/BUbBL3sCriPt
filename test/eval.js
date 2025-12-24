import assert from "assert";
import sinon from "sinon";

import { List, Vektar } from "../src/list.js";
import { parse } from "../src/parse.js";
import Keyword from "../src/keyword.js";
import { rootBinding } from "../src/binding.js";

import { ėval, evalEach } from "../src/eval.js";

// const { List, Vektar, rootBinding,
//   ėval, ëval, parse, Keyword } =
//   require("../src/BubbleScript");



describe("evalEach", function () {

  it("evaluates a keyword", function() {
    const parseTree = parse(":keyword");
    const result = evalEach(null, parseTree);
    assert.equal(result, Keyword.for("keyword"));
  });

});

describe("ėval", function () {

  afterEach(function () {
    sinon.restore();
  });

  it("evaluates a keyword", function() {
    const result = ėval(null, ":keyword");
    assert.equal(result, Keyword.for("keyword"));
  });

  it.only("runs script top to bottom", function () {
    const binding = Object.create(rootBinding);
    sinon.replace(console, "log", sinon.fake())
    // ėval("(muf puts (fn [a] (console.log a))) " +
    //      "(puts 1) (puts 2) (puts 3)");
    ėval(binding,
      "(muf puts (fn [a] (console.log a)))\n" +
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

  it("evaluates a vektar with ease", function () {
    let result = ėval("[1 2 3]");
    assert(result instanceof Vektar);
  });

  it("expands a macro", function () {
    // Create a special binding we will use for
    // our test.
    const bnd = Object.create(rootBinding);


    // Parse a macro to be used for our test..
    const ast =
      parse('(muf 🐒 (macro []   '+
            '  °(puts "Monkey")))');

    // Call toString() on our parsed macro to
    // ensure it is as we expect, asserting it
    // is equal with a comparison.
    assert.equal(ast.toString(),
      '((muf 🐒 (macro [] °(puts "Monkey"))))');

    // Evaluate our test macro against or test
    // binding to store it in the binding t
    // for use in the remainder of test.
    ast.evalEach(bnd);

    // Parse and evaulate a function that uses the
    // macro.
    const fn = parse("(fn [] (🐒))").evalEach(bnd);

    // Check that the function body looks like we
    // expect.
    assert.equal(fn.body.toString(), "((🐒))");

    // Simulate a function invokation by
    // evaulating the body of the function against
    // our test body which contains the macro.
    fn.body.evalEach(bnd);

    // Confirm that the function body is now
    // changed and now contains the macro's
    // expanded form.
    assert.equal(fn.body.toString(),
      "((puts \"Monkey\"))");

    // Simulate another invokation of the
    // function.
    fn.body.evalEach(bnd);

    // Check the body, once again, confirming this
    // time it has not changed.
    assert.equal(fn.body.toString(),
      "((puts \"Monkey\"))");
  });

  it.only("expands a more complex macro", function () {
    let bnd = Object.create(rootBinding);

    // Override puts with noop function.
    bnd.puts = function () {};

    let ast =
      parse("(muf 🐒 (macro [🐸 🐷 🦎] "+
            "  (list °puts             "+
            "    (list °+ 🐸 🐷 🦎))   "+
            "  (list °puts             "+
            "    (+ 🐸 🐷 🐷) 🦎)))    ");

    assert.equal(ast.toString(),
      "((muf 🐒 (macro [🐸 🐷 🦎] "+
      "(list °puts (list °+ 🐸 🐷 🦎)) "+
      "(list °puts (+ 🐸 🐷 🐷) 🦎))))");

    evalEach(bnd, ast);

    let fn =
      evalEach(bnd, parse("((fn 🪻) (* 6 9) "+
                "(🐒 1 2 🪻) (+ 3 4))"));

    assert.equal(fn.body.toString(),
      "((* 6 9) (🐒 1 2 🪻) (+ 3 4))");

    evalEach(bnd, fn.body);

    assert.equal(fn.body.toString(),
      "((* 6 9) (puts (+ 1 2 🪻)) "+
                "(puts 5 🪻) (+ 3 4))");
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

