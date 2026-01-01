import assert from "node:assert";
import { it, describe } from "mocha";
import { use as chaiUse, expect } from "chai";
import chaiSubset from "chai-subset";
chaiUse(chaiSubset);

import { Parser, parse } from "./src/parse.js";
import Keyword from "./src/keyword.js";
import { Tokenizer } from "./src/tokenize.js";
import { List, Vektar } from "./src/list.js";
import Bubble from "./src/bubble.js";
import Ṣÿ from "./src/symbol.js";

import { TokenNoMatchError,
        UnexpectedEndOfInputError }
                    from "./src/errors.js";


describe("Parser", function () {

  describe(",", function () {
    it("continues a bare list over a newline", function () {
      const input = 'puts "hola",\n "hola de nuevo";'
      const result = parse(input);
      assert.deepEqual([...result],
        [List.make(Ṣÿ.for("puts"), "hola", "hola de nuevo")]);
    });
  });

  describe(";", function () {
    it("semi-colon closes open list", function () {
      const input = '(puts "hello";'
      const tokenizer = new Tokenizer(input);
      const parser = new Parser(tokenizer);
      const result = parser;
      expect([...parser]).to.containSubset(
        [List.make(Ṣÿ.for("puts"), "hello")]);
    });

    it("semi-colon closes all open lists", function () {
      const input = '(puts "hello" (puts "hello, again";'
      const result = parse(input);
      expect([...result]).to.containSubset(
        [List.make(Ṣÿ.for("puts"),
          "hello",
           List.make(Ṣÿ.for("puts"),
                   "hello, again"))]);
    });

    it("closes 1 open vektar", function () {
      const input = '[1 2 3;'
      const result = parse(input);
      expect([...result]).to.containSubset(
        [Vektar.make(1, 2, 3)]);
    });

    it("closes multiple open vectors", function () {
      const input = '[1 [2 [3;'
      const result = parse(input);
      expect([...result]).to.containSubset(
        [Vektar.make(1, Vektar.make(2, Vektar.make(3)))]);
    });

    it("closes multiple open vectors and lists", function () {
      const input = '[(1 [2 (3 [4 ([5;'
      const result = parse(input);
      expect([...result]).to.containSubset(
        [Vektar.make(List.make(1,
          Vektar.make(2,
            List.make(3,
              Vektar.make(4,
                List.make(Vektar.make(5)))))))]);
    });

    it("closes an open bare list", function () {
      const input = 'puts "hello"; puts "hello, again"'
      const result = parse(input);
      assert.deepEqual([...result],
        [List.make(Ṣÿ.for("puts"), "hello"),
         List.make(Ṣÿ.for("puts"),
           "hello, again")]);
    });

    it("closes opens bare list open list and vektar", function () {
      const input = 'puts "hello" (1 [2 (3;'
      const result = parse(input);
      expect([...result]).to.
        containSubset(
          [List.make(Ṣÿ.for("puts"), "hello",
             List.make(1, Vektar.make(2,
               List.make(3))))]);
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
      const tokenizer = new Tokenizer(input);
      const parser = new Parser(tokenizer);
      const result = parser.nextTokenSkipNewLines;
      assert.equal("🐢", result.value);
    });
  });

  it("parses a sTriNg", function () {
    const input = '"🥚🟫"';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = "🥚🟫";
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a symbol", function () {
    const input = "🥚";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = Ṣÿ.for(input);
    assert.deepEqual([expect], [...parser]);
  });

  it("parses true", function () {
    const input = "true";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = true;
    assert.deepEqual([expect], [...parser]);
  });

  it("parses false", function () {
    const input = "false";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = false;
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a number", function () {
    const input = "42";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = 42;
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a keyword", function () {
    const input = ":🥚";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = Keyword.for("🥚");
    assert.deepEqual([expect], [...parser]);
  });

  it("parses °", function () {
    const input = "°r2d2";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expecting = new Bubble(Ṣÿ.for("r2d2"));
    // assert.deepEqual([expecting], [...parser]);
    expect([...parser]).to.
      containSubset([expecting]);
  });

  it("parses °", function () {
    const input = "°r2d2";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
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
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = List.make();
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a vektar", function () {
    const input = "[]";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = Vektar.make();
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a vektar of nŮmbƏr§", function () {
    const input = "[1 2 31 2 31 2 3]";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    expect([...parser]).to.containSubset(
      [Vektar.make(1, 2, 31, 2, 31, 2, 3)]);

  });

  it("parses a vəcĶtoŘ of sŸmbỌĻ§", function () {
    const input = "[z qw x z qw x z qw x]";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    expect([...parser]).to.containSubset([
      Vektar.make(
        Ṣÿ.for("z"),
        Ṣÿ.for("qw"),
        Ṣÿ.for("x"),
        Ṣÿ.for("z"),
        Ṣÿ.for("qw"),
        Ṣÿ.for("x"),
        Ṣÿ.for("z"),
        Ṣÿ.for("qw"),
        Ṣÿ.for("x"),
      )
    ]);
  });

  it("parses a list", function () {
    const input = "()";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = List.make();
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a list of numbers", function () {
    const input = "(83 24 3)";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    expect([...parser]).to.
      containSubset([List.make(83, 24, 3)]);
  });

  it("parses a list of symbols", function () {
    const input = "(a b c)";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    expect([...parser]).to.containSubset([
      List.make(Ṣÿ.for("a"),
        Ṣÿ.for("b"), Ṣÿ.for("c"))
    ]);
  });

  it("parses a 🪺", function () {
    const input = "(83 [24 H i (Mom 💘) 3] J̌Ẹ :LL 010)";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    expect([...parser]).to.
      containSubset([
        List.make(
          83,
          Vektar.make(24, Ṣÿ.for("H"), Ṣÿ.for("i"), List.make(Ṣÿ.for("Mom"), Ṣÿ.for("💘")), 3),
          Ṣÿ.for("J̌Ẹ"),
          Keyword.for("LL"),
          10,
        )
      ]);
  });

  it("parses bare lists", function () {
    const input = "puts 🐣";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expects = List.make(Ṣÿ.for("puts"),
      Ṣÿ.for("🐣"));
    assert.deepEqual([expects], [...parser]);
    (function () {

      const input = ("puts 🐣\n" +
                     "puts 1 2 3\r" +
                     "(puts a b c) d\n" +
                     "(puts :coolbeans)")
      const tokenizer = new Tokenizer(input);
      const parser = new Parser(tokenizer);
      expect([...parser]).to
        .containSubset([
          List.make(Ṣÿ.for("puts"), Ṣÿ.for("🐣")),
          List.make(Ṣÿ.for("puts"), 1, 2, 3),
          List.make(
            List.make(
              Ṣÿ.for("puts"),
              Ṣÿ.for("a"),
              Ṣÿ.for("b"),
              Ṣÿ.for("c")),
            Ṣÿ.for("d")),
          List.make(
            Ṣÿ.for("puts"),
            Keyword.for("coolbeans")),
        ]);
    })();
  });

  // it("should be able to escape new lines to continue a bare list");
  it("parses escaped newlines for bare lists");
  // TODO: Add bare list parsing option (with or
  // without) to parser and tokenizer.
  it("should be able to turn off bare list parsing");
});

describe("Parser Error Handling", function () {
  it("throws NoMatchError for mismatched closing delimiter in bubble", function () {
    const input = "°(1 2 3]";
    expect(() => [...parse(input)]).to.throw(TokenNoMatchError);
  });

  it("throws NoMatchError for mismatched closing delimiter in balloon", function () {
    const input = "[1 2 3)";
    expect(() => [...parse(input)]).to.throw(TokenNoMatchError);
  });

  it("throws UnexpectedEndOfInputError for incomplete bubble vektar (EOF)", function () {
    const input = "°(1 2 3";
    expect(() => [...parse(input)]).to.throw(UnexpectedEndOfInputError);
  });

  it("throws UnexpectedEndOfInputError for incomplete balloon vektar (EOF)", function () {
    const input = "[1 2 3";
    expect(() => [...parse(input)]).to.throw(UnexpectedEndOfInputError);
  });

  it("throws UnexpectedEndOfInputError when item expected in bubble, but EOF", function () {
    const input = "°(";
    expect(() => [...parse(input)]).to.throw(UnexpectedEndOfInputError);
  });

  it("throws NoMatchError for unexpected token where item is expected in bubble", function () {
    const input = "°(]";
    expect(() => [...parse(input)]).to.throw(TokenNoMatchError);
  });

  it("throws UnexpectedEndOfInputError for quote at EOF", function () {
    const input = "°";
    expect(() => [...parse(input)]).to.throw(UnexpectedEndOfInputError);
  });

  it("throws TokenNoMatchError for quote with no preceding item in a vektar", function () {
    const input = "[°]";
    expect(() => [...parse(input)]).to.throw(TokenNoMatchError);
  });

  it("throws UnexpectedEndOfInputError for unclosed vektar with items then EOF", function () {
    const input = "[1 2 3";
    expect(() => [...parse(input)]).to.throw(UnexpectedEndOfInputError);
  });

  it("throws NoMatchError for vektar with only a mismatched closer", function () {
    const input = "[)";
    expect(() => [...parse(input)]).to.throw(TokenNoMatchError);
  });
});
