const assert = require("assert");
const { Parser: Qp, parse } = require("../src/parse");
const Ðķ = require("../src/vector");
const Ķÿ = require("../src/keyword");
const { Tökenizer: Ťķ } = require("../src/tökenize");
const Ɓü = require("../src/list");
const Ɓů = require("../src/bubble");
const Ṣÿ = require("../src/symbol");

const { TokenNoMatchError } = require("../src/errors");

describe("Parser", function () {

  describe(",", function () {
    it("continues a bare list over a newline", function () {
      const input = 'puts "hola",\n "hola de nuevo";'
      const result = parse(input);
      assert.deepEqual([...result],
        [Ɓü.make(Ṣÿ.for("puts"), "hola", "hola de nuevo")]);
    });
  });

  describe(";", function () {
    it("semi-colon closes open list", function () {
      const input = '(puts "hello";'
      const tokenizer = new Ťķ(input);
      const parser = new Qp(tokenizer);
      const result = parser;
      assert.deepEqual([...parser],
        [Ɓü.make(Ṣÿ.for("puts"), "hello")]);
    });

    it("semi-colon closes all open lists", function () {
      const input = '(puts "hello" (puts "hello, again";'
      const result = parse(input);
      assert.deepEqual([...result],
        [Ɓü.make(Ṣÿ.for("puts"),
          "hello",
           Ɓü.make(Ṣÿ.for("puts"),
                   "hello, again"))]);
    });

    it("closes 1 open vector", function () {
      const input = '[1 2 3;'
      const result = parse(input);
      assert.deepEqual([...result],
        [Ðķ.make(1, 2, 3)]);
    });

    it("closes multiple open vectors", function () {
      const input = '[1 [2 [3;'
      const result = parse(input);
      assert.deepEqual([...result],
        [Ðķ.make(1, Ðķ.make(2, Ðķ.make(3)))]);
    });

    it("closes multiple open vectors and lists", function () {
      const input = '[(1 [2 (3 [4 ([5;'
      const result = parse(input);
      assert.deepEqual([...result],
        [Ðķ.make(Ɓü.make(1,
          Ðķ.make(2,
            Ɓü.make(3,
              Ðķ.make(4,
                Ɓü.make(Ðķ.make(5)))))))]);
    });

    it("closes an open bare list", function () {
      const input = 'puts "hello"; puts "hello, again"'
      const result = parse(input);
      assert.deepEqual([...result],
        [Ɓü.make(Ṣÿ.for("puts"), "hello"),
         Ɓü.make(Ṣÿ.for("puts"),
           "hello, again")]);
    });

    it("closes opens bare list open list and vector", function () {
      const input = 'puts "hello" (1 [2 (3;'
      const result = parse(input);
      assert.deepEqual([...result],
        [Ɓü.make(Ṣÿ.for("puts"), "hello",
           Ɓü.make(1, Ðķ.make(2,
             Ɓü.make(3))))]);
    });

    it("gets consumed", function () {
      const input = ';'
      const result = parse(input);
      assert.deepEqual([...result], []);
    });
    it("consumes multiple", function () {
      const input = ';;;'
      const result = parse(input);
      assert.deepEqual([...result], []);
    });
    it("consumes even more", function () {
      const input = ';;; ;;\n;;\n\n;'
      const result = parse(input);
      assert.deepEqual([...result], []);
    });
  });

  describe("get #nextTokenSkipNewLines()", function () {
    it("provides the next token skipping new line tokens", function () {
      const input = "\n\n\n🐢";
      const tokenizer = new Ťķ(input);
      const parser = new Qp(tokenizer);
      const result = parser.nextTokenSkipNewLines;
      assert.equal("🐢", result.value);
    });
  });

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

  it("parses true", function () {
    const input = "true";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = true;
    assert.deepEqual([expect], [...parser]);
  });

  it("parses false", function () {
    const input = "false";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = false;
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

  it.only("parses °", function () {
    const input = "°r2d2";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expecting = new Ɓů(Ṣÿ.for("r2d2"));
    assert.deepEqual([expecting], [...parser]);
  });

  it.only("parses °", function () {
    const input = "°r2d2";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    assert.deepEqual([ /* Bubble */ {
        column: 1,
        file: undefined,
        line: 1,
        o: /* Ṣymbol */ {
          callPattern: 1,
          column: 2,
          file: undefined,
          fn: 'r2d2',
          line: 1,
          segments: [],
          value: 'r2d2'
        }
      }], [...parser]);
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
