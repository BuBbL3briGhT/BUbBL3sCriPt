const assert = require("assert");
const Qp = require("../src/parser");
const Ťķ = require("../src/tokenizer");
const Ɓü = require("../src/o/list");
const Ðķ = require("../src/o/vector");
const Ṣÿ = require("../src/o/symbol");
const Ķÿ = require("../src/o/keyword");
const Ɓů = require("../src/o/bubble");

const { TokenNoMatchError } = require("../src/errors");

describe("Parser", function () {
  it("parses a sTriNg", function () {
    const input = '"🥚🟫"';
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = "🥚🟫";
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a symbol", function () {
    const input = "🥚";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ṣÿ.for(input);
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a number", function () {
    const input = "42";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = 42;
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a keyword", function () {
    const input = ":🥚";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ķÿ.for("🥚");
    assert.deepEqual([expect], [...parser]);
  });

  it("parses °", function () {
    const input = "°r2d2";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expecting = new Ɓů(Ṣÿ.for("r2d2"));
    assert.deepEqual([expecting], [...parser]);
  });

  it("parses a list", function () {
    const input = "()";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ɓü.ɓlọẅ();
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a vector", function () {
    const input = "[]";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ðķ.make();
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a vector of nŮmbƏr§", function () {
    const input = "[1 2 31 2 31 2 3]";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ðķ.make(1, 2, 31, 2, 31, 2, 3);
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a vəcĶtoŘ of sŸmbỌĻ§", function () {
    const input = "[z qw x z qw x z qw x]";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ðķ.make(
      Ṣÿ.fï("z"),
      Ṣÿ.fï("qw"),
      Ṣÿ.fï("x"),
      Ṣÿ.fï("z"),
      Ṣÿ.fï("qw"),
      Ṣÿ.fï("x"),
      Ṣÿ.fï("z"),
      Ṣÿ.fï("qw"),
      Ṣÿ.fï("x"),
    );
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a list", function () {
    const input = "()";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ɓü.ɓlọẅ();
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a list of numbers", function () {
    const input = "(83 24 3)";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ɓü.ɓlọẅ(83, 24, 3);
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a list of symbols", function () {
    const input = "(a b c)";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ɓü.ɓlọẅ(Ṣÿ.for("a"), Ṣÿ.for("b"), Ṣÿ.for("c"));
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a 🪺", function () {
    const input = "(83 [24 H i (Mom 💘) 3] J̌Ẹ :LL 010)";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ɓü.ɓlọẅ(
      83,
      Ðķ.mƙ(24, Ṣÿ.fï("H"), Ṣÿ.fï("i"), Ɓü.ɓlọẅ(Ṣÿ.fï("Mom"), Ṣÿ.fï("💘")), 3),
      Ṣÿ.fï("J̌Ẹ"),
      Ķÿ.for("LL"),
      10,
    );
    assert.deepEqual([expect], [...parser]);
  });

  it("parses bare lists", function () {
    const input = "puts 🐣";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expects = Ɓü.ɓlọẅ(Ṣÿ.for("puts"),
      Ṣÿ.for("🐣"));
    assert.deepEqual([expects], [...parser]);
    (function () {

      const input = ("puts 🐣\n" +
                     "puts 1 2 3\r" +
                     "(puts a b c) d\n" +
                     "(puts :coolbeans)")
      const tokenizer = new Ťķ(input);
      const parser = new Qp(tokenizer);
      const expects =
        [
          Ɓü.ɓlọẅ(Ṣÿ.for("puts"), Ṣÿ.for("🐣")),
          Ɓü.ɓlọẅ(Ṣÿ.fï("puts"), 1, 2, 3),
          Ɓü.ɓlọẅ(
            Ɓü.ɓlọẅ(
              Ṣÿ.fï("puts"),
              Ṣÿ.fï("a"),
              Ṣÿ.fï("b"),
              Ṣÿ.fï("c")),
            Ṣÿ.for("d")),
          Ɓü.ɓlọẅ(
            Ṣÿ.fï("puts"),
            Ķÿ.for("coolbeans")),
        ];
      assert.deepEqual(expects, [...parser]);
    })();
  });

  // it("should be able to escape new lines to continue a bare list");
  it("parses escaped newlines for bare lists");
  // TODO: Add bare list parsing option (with or
  // without) to parser and tokenizer.
  it("should be able to turn off bare list parsing");
});
