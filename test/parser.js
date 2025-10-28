const assert = require("assert");
const chai = require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
const { expect } = chai;

const { Parser: Qp, parse } = require("../src/parse");
const Ðķ = require("../src/vektar");
const Ķÿ = require("../src/keyword");
const { Tökenizer: Ťķ } = require("../src/tökenize");
const Ɓü = require("../src/lista");
const Ɓů = require("../src/booble");
const Ṣÿ = require("../src/symbol");

const { TokenNoMatchError } = require("../src/errors");

describe("Parser", function () {

  describe(",", function () {
    it("continues a bare lista over a newline", function () {
      const input = 'puts "hola",\n "hola de nuevo";'
      const result = parse(input);
      assert.deepEqual([...result],
        [Ɓü.blow(Ṣÿ.for("puts"), "hola", "hola de nuevo")]);
    });
  });

  describe(";", function () {
    it("semi-colon closes open lista", function () {
      const input = '(puts "hello";'
      const tokenizer = new Ťķ(input);
      const parser = new Qp(tokenizer);
      const result = parser;
      expect([...parser]).to.containSubset(
        [Ɓü.blow(Ṣÿ.for("puts"), "hello")]);
    });

    it("semi-colon closes all open lists", function () {
      const input = '(puts "hello" (puts "hello, again";'
      const result = parse(input);
      expect([...result]).to.containSubset(
        [Ɓü.blow(Ṣÿ.for("puts"),
          "hello",
           Ɓü.blow(Ṣÿ.for("puts"),
                   "hello, again"))]);
    });

    it("closes 1 open vektar", function () {
      const input = '[1 2 3;'
      const result = parse(input);
      expect([...result]).to.containSubset(
        [Ðķ.blow(1, 2, 3)]);
    });

    it("closes multiple open vectors", function () {
      const input = '[1 [2 [3;'
      const result = parse(input);
      expect([...result]).to.containSubset(
        [Ðķ.blow(1, Ðķ.blow(2, Ðķ.blow(3)))]);
    });

    it("closes multiple open vectors and lists", function () {
      const input = '[(1 [2 (3 [4 ([5;'
      const result = parse(input);
      expect([...result]).to.containSubset(
        [Ðķ.blow(Ɓü.blow(1,
          Ðķ.blow(2,
            Ɓü.blow(3,
              Ðķ.blow(4,
                Ɓü.blow(Ðķ.blow(5)))))))]);
    });

    it("closes an open bare lista", function () {
      const input = 'puts "hello"; puts "hello, again"'
      const result = parse(input);
      assert.deepEqual([...result],
        [Ɓü.blow(Ṣÿ.for("puts"), "hello"),
         Ɓü.blow(Ṣÿ.for("puts"),
           "hello, again")]);
    });

    it("closes opens bare lista open lista and vektar", function () {
      const input = 'puts "hello" (1 [2 (3;'
      const result = parse(input);
      expect([...result]).to.
        containSubset(
          [Ɓü.blow(Ṣÿ.for("puts"), "hello",
             Ɓü.blow(1, Ðķ.blow(2,
               Ɓü.blow(3))))]);
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

  it("parses °", function () {
    const input = "°r2d2";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expecting = new Ɓů(Ṣÿ.for("r2d2"));
    // assert.deepEqual([expecting], [...parser]);
    expect([...parser]).to.
      containSubset([expecting]);
  });

  it("parses °", function () {
    const input = "°r2d2";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    assert.deepEqual([ /* Booble */ {
        column: 1,
        file: undefined,
        line: 1,
        o: /* Ṣymbol */ {
          callPattern: 1,
          column: 2,
          file: undefined,
          funk: 'r2d2',
          line: 1,
          segments: [],
          value: 'r2d2'
        }
      }], [...parser]);
  });

  it("parses a lista", function () {
    const input = "()";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ɓü.ɓlọẅ();
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a vektar", function () {
    const input = "[]";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ðķ.blow();
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a vektar of nŮmbƏr§", function () {
    const input = "[1 2 31 2 31 2 3]";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    expect([...parser]).to.containSubset(
      [Ðķ.blow(1, 2, 31, 2, 31, 2, 3)]);

  });

  it("parses a vəcĶtoŘ of sŸmbỌĻ§", function () {
    const input = "[z qw x z qw x z qw x]";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    expect([...parser]).to.containSubset([
      Ðķ.blow(
        Ṣÿ.fï("z"),
        Ṣÿ.fï("qw"),
        Ṣÿ.fï("x"),
        Ṣÿ.fï("z"),
        Ṣÿ.fï("qw"),
        Ṣÿ.fï("x"),
        Ṣÿ.fï("z"),
        Ṣÿ.fï("qw"),
        Ṣÿ.fï("x"),
      )
    ]);
  });

  it("parses a lista", function () {
    const input = "()";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    const expect = Ɓü.ɓlọẅ();
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a lista of numbers", function () {
    const input = "(83 24 3)";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    expect([...parser]).to.
      containSubset([Ɓü.ɓlọẅ(83, 24, 3)]);
  });

  it("parses a lista of symbols", function () {
    const input = "(a b c)";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    expect([...parser]).to.containSubset([
      Ɓü.ɓlọẅ(Ṣÿ.for("a"),
        Ṣÿ.for("b"), Ṣÿ.for("c"))
    ]);
  });

  it("parses a 🪺", function () {
    const input = "(83 [24 H i (Mom 💘) 3] J̌Ẹ :LL 010)";
    const tokenizer = new Ťķ(input);
    const parser = new Qp(tokenizer);
    expect([...parser]).to.
      containSubset([
        Ɓü.ɓlọẅ(
          83,
          Ðķ.mƙ(24, Ṣÿ.fï("H"), Ṣÿ.fï("i"), Ɓü.ɓlọẅ(Ṣÿ.fï("Mom"), Ṣÿ.fï("💘")), 3),
          Ṣÿ.fï("J̌Ẹ"),
          Ķÿ.for("LL"),
          10,
        )
      ]);
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
      expect([...parser]).to
        .containSubset([
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
        ]);
    })();
  });

  // it("should be able to escape new lines to continue a bare lista");
  it("parses escaped newlines for bare lists");
  // TODO: Add bare lista parsing option (with or
  // without) to parser and tokenizer.
  it("should be able to turn off bare lista parsing");
});
