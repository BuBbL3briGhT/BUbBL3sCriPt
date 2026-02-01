import { it, describe } from "mocha";
import assert from "assert";
import sinon from "sinon";

import { List, Vektar } from "../../☕️/list.js";
import { parse } from "../../☕️/parse.js";
import Keyword from "../../☕️/keyword.js";
import { rootBinding } from "../../☕️/binding.js";

import { ėval, evalEach, evalExpression }
                            from "../../☕️/eval.js";

describe("evalExpression", function () {
  it("evaluates zero", function () {
    const result = evalExpression(null, "0");
    assert.equal(result, 0);
  });
});


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

  it("runs script top to bottom", function () {
    const binding = Object.create(rootBinding);
    sinon.replace(console, "log", sinon.fake())
    // ėval("(muf puts (fn [a] (console.log a))) " +
    //      "(puts 1) (puts 2) (puts 3)");
    ėval(binding,
      "(define puts ((fn a) (console.log a)))\n" +
         "(puts 1)\n(puts 2)\n(puts 3)");
    // ėval("(puts 1)\n(puts 2)\n(puts 3)");
    // ėval("(puts 3)\n(puts 2)\n(puts 1)\n(muf puts (fn [a] (console.log a)))"); // fyi: Pass with this under reverse execution.
    assert(console.log.calledWith(1));
    assert(console.log.calledWith(2));
    assert(console.log.calledWith(3));
  });

  it("evaluates BubbleScript", function () {
    const binding = Object.create(rootBinding);
    assert.equal(ėval(binding, "(+ 45 87)"), 132);
  });

  it("can console.log", function () {
    const binding = Object.create(rootBinding);
    sinon.replace(console, "log", sinon.fake())
    ėval(binding, '(console.log "Bonjour Marbre")');
    assert(console.log.calledWith("Bonjour Marbre"));
  });

  it("evaluates a vektar with ease", function () {
    const binding = Object.create(rootBinding);
    let result = ėval(binding, "[1 2 3]");
    assert(result instanceof Vektar);
  });

  it("expands a macro", function () {
    // Create a special binding we will use for
    // our test.
    const bnd = Object.create(rootBinding);


    sinon.replace(console, "log", sinon.fake())
    ėval(bnd, "(define (puts & msgs) (console.log & msgs))");


    // Parse a macro to be used for our test..
    const ast =
      parse('(define 🐒 ((macro)   '+
            '  °(puts "Monkey")))');

    // Call toString() on our parsed macro to
    // ensure it is as we expect, asserting it
    // is equal with a comparison.
    assert.equal(ast.toString(),
      '((define 🐒 ((macro) °(puts "Monkey"))))');

    // Evaluate our test macro against or test
    // binding to store it in the binding t
    // for use in the remainder of test.
    evalEach(bnd, ast);

    // Parse and evaulate a function that uses the
    // macro.
    const fn = evalEach(bnd, parse("((fn) (🐒))"));

    // Check that the function body looks like we
    // expect.
    assert.equal(fn.body.toString(), "((🐒))");

    // Simulate a function invokation by
    // evaulating the body of the function against
    // our test body which contains the macro.
    evalEach(bnd, fn.body);

    // Confirm that the function body is now
    // changed and now contains the macro's
    // expanded form.
    assert.equal(fn.body.toString(),
      "((puts \"Monkey\"))");

    // Simulate another invokation of the
    // function.
    evalEach(bnd, fn.body);

    // Check the body, once again, confirming this
    // time it has not changed.
    assert.equal(fn.body.toString(),
      "((puts \"Monkey\"))");
  });

  it("expands a more complex macro", function () {
    let bnd = Object.create(rootBinding);

    // Override puts with noop function.
    bnd.puts = function () {};

    let ast =
      parse("(define 🐒 ((macro 🐸 🐷 🦎) "+
            "  (list °puts             "+
            "    (list °+ 🐸 🐷 🦎))   "+
            "  (list °puts             "+
            "    (+ 🐸 🐷 🐷) 🦎)))    ");

    assert.equal(ast.toString(),
      "((define 🐒 ((macro 🐸 🐷 🦎) "+
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
      const bnd = Object.create(rootBinding);
      assert.equal(ėval(bnd,
        "(((fn a b c) (list b c a)) 1 2 3)")
          .toString(), "(2 3 1)");
      assert.equal(ėval(bnd,
        "(((fn a & b) (list a b)) 1 2 3)")
          .toString(), "(1 (2 3))");
      assert.equal(ėval(bnd,
        "(((fn & a) (send a :pop)) 1 2 3)")
          .toString(), "(2 3)");
      // assert.equal(ėval(
      //   "((fn [& a] (pop a)) 1 2 3)")
      //     .toString(), "(2 3)");
      // assert.equal(ėval(
      //   "((fn [a b & c] (list & c)) 1 2 3)")
      //     .toString(), "(3)");
    });
    it("destructures", function () {
      const bnd = Object.create(rootBinding);
      assert.equal(ėval(bnd,
        "(((fn a b) (list a b b)) 1 [2 3])")
          .toString(), "(1 [2 3] [2 3])");
      assert.equal(ėval(bnd,
        "(((fn a [b c]) (list a b c)) 1 [2 3])")
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

