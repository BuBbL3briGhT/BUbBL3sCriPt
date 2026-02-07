import assert from 'node:assert';
import { it, describe } from 'mocha';
import fs from 'fs';
import { use as chaiUse, expect } from 'chai';
import chaiSubset from 'chai-subset';
chaiUse(chaiSubset);

import Yaml from 'yaml';

import { Parser, parse } from '../../☕️/parse.js';
import { List, Vektar } from '../../☕️/list.js';
import Keyword from '../../☕️/keyword.js';
import Ṣymbol from '../../☕️/symbol.js';
import Ṣÿ from '../../☕️/symbol.js';
import Bubble from '../../☕️/bubble.js';
import { Tokenizer } from '../../☕️/tokenize.js';

import {
  TokenNoMatchError,
  UnexpectedEndOfInputError,
} from '../../☕️/errors.js';

const symbol = Ṣymbol.for('symbol'),
  a = Ṣymbol.for('a'),
  b = Ṣymbol.for('b'),
  c = Ṣymbol.for('c');

const keyword = Keyword.for('keyword');

let data = fs.readFileSync('🧪/☕️/fixtures/parser.yml', 'utf8');
let fixtures = Yaml.parse(data);

describe('parse(string)', () => {
  it('parses the number 0 correctly', function () {
    const ast = parse('0');
    // console.log(...ast);
    expect(ast.peek()).to.equal(0);
  });

  it('parses (1 2 3) into the correct AST structure', () => {
    const ast = parse('(1 2 3)');
    const expectedAst = List.make(1, 2, 3);
    expect(ast.peek()).to.containSubset(expectedAst);
    // "AST for (1 2 3) should be a list of 1, 2, 3");
  });

  it('parses (not true) into the correct AST structure', () => {
    let not = Ṣymbol.for('not');
    const ast = parse('(not true)');
    const expectedAst = List.make(not, true);
    expect(ast.peek()).to.containSubset(expectedAst);
  });

  it('parses a bubble of list', function () {
    let m = parse('°(a b c)');
    assert(m.peek() instanceof Bubble);
  });

  itParses('symbol', { expects: symbol });
  itParses(':keyword', { expects: keyword });
  itParses('(1 2 3)', { expects: List.make(1, 2, 3) });
  itParses('(a b c)', { expects: List.make(a, b, c) });
  itParses('(a 3 b 2 c 1)', { expects: List.make(a, 3, b, 2, c, 1) });

  itParses2('a nested bubble', '(1 (2))', List.from([1, List.from([2])]));

  // (define (abs x)
  //   (if (< x 0)
  //       (- x)
  //       x))
  itParsesFixture('abs', {
    expects: List.from([
      Ṣymbol.for('define'),
      List.from([Ṣymbol.for('abs'), Ṣymbol.for('x')]),
      List.from([
        Ṣymbol.for('if'),
        List.from([Ṣymbol.for('<'), Ṣymbol.for('x'), 0]),
        List.from([Ṣymbol.for('-'), Ṣymbol.for('x')]),
        Ṣymbol.for('x'),
      ]),
    ]),
  }); // Changed Bubble.from to List.from

  // it('should match a single keyword as a bubble', function() {
  //   assertParse(":keyword",
  //     Bubble.make(Keyword.for("keyword")));
  //   // assertParse(":kEyWoRd",
  //     // Bubble.make(Keyword.for("kEyWoRd")));
  //   // assertParse(":maRbLes",
  //     // Bubble.make(Keyword.for("maRbLes")));
  //   // assertParse(":good :bAD\n:ULgY",
  //     // Bubble.make(Keyword.for("good"),
  //     //   Keyword.for("bAD")),
  //     // Bubble.make(Keyword.for("ULgY")));
  // });
});

describe('Parser', function () {
  describe(',', function () {
    it('continues a bare list over a newline', function () {
      const input = 'puts "hola",\n "hola de nuevo";';
      const result = parse(input);
      assert.deepEqual(
        [...result],
        [List.make(Ṣÿ.for('puts'), 'hola', 'hola de nuevo')],
      );
    });
  });

  describe(';', function () {
    it('semi-colon closes open list', function () {
      const input = '(puts "hello";';
      const tokenizer = new Tokenizer(input);
      const parser = new Parser(tokenizer);
      expect([...parser]).to.containSubset([
        List.make(Ṣÿ.for('puts'), 'hello'),
      ]);
    });

    it('semi-colon closes all open lists', function () {
      const input = '(puts "hello" (puts "hello, again";';
      const result = parse(input);
      expect([...result]).to.containSubset([
        List.make(
          Ṣÿ.for('puts'),
          'hello',
          List.make(Ṣÿ.for('puts'), 'hello, again'),
        ),
      ]);
    });

    it('closes 1 open vektar', function () {
      const input = '[1 2 3;';
      const result = parse(input);
      expect([...result]).to.containSubset([Vektar.make(1, 2, 3)]);
    });

    it('closes multiple open vectors', function () {
      const input = '[1 [2 [3;';
      const result = parse(input);
      expect([...result]).to.containSubset([
        Vektar.make(1, Vektar.make(2, Vektar.make(3))),
      ]);
    });

    it('closes multiple open vectors and lists', function () {
      const input = '[(1 [2 (3 [4 ([5;';
      const result = parse(input);
      expect([...result]).to.containSubset([
        Vektar.make(
          List.make(
            1,
            Vektar.make(
              2,
              List.make(3, Vektar.make(4, List.make(Vektar.make(5)))),
            ),
          ),
        ),
      ]);
    });

    it('closes an open bare list', function () {
      const input = 'puts "hello"; puts "hello, again"';
      const result = parse(input);
      assert.deepEqual(
        [...result],
        [
          List.make(Ṣÿ.for('puts'), 'hello'),
          List.make(Ṣÿ.for('puts'), 'hello, again'),
        ],
      );
    });

    it('closes opens bare list open list and vektar', function () {
      const input = 'puts "hello" (1 [2 (3;';
      const result = parse(input);
      expect([...result]).to.containSubset([
        List.make(
          Ṣÿ.for('puts'),
          'hello',
          List.make(1, Vektar.make(2, List.make(3))),
        ),
      ]);
    });

    it('gets consumed', function () {
      const input = ';';
      const result = parse(input);
      assert.deepEqual([...result], []);
    });
    it('consumes multiple', function () {
      const input = ';;;';
      const result = parse(input);
      assert.deepEqual([...result], []);
    });
    it('consumes even more', function () {
      const input = ';;; ;;\n;;\n\n;';
      const result = parse(input);
      assert.deepEqual([...result], []);
    });
  });

  describe('get #nextTokenSkipNewLines()', function () {
    it('provides the next token skipping new line tokens', function () {
      const input = '\n\n\n🐢';
      const tokenizer = new Tokenizer(input);
      const parser = new Parser(tokenizer);
      const result = parser.nextTokenSkipNewLines;
      assert.equal('🐢', result.value);
    });
  });

  it('parses a sTriNg', function () {
    const input = '"🥚🟫"';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = '🥚🟫';
    assert.deepEqual([expect], [...parser]);
  });

  it('parses a symbol', function () {
    const input = '🥚';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = Ṣÿ.for(input);
    assert.deepEqual([expect], [...parser]);
  });

  it('parses true', function () {
    const input = 'true';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = true;
    assert.deepEqual([expect], [...parser]);
  });

  it('parses false', function () {
    const input = 'false';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = false;
    assert.deepEqual([expect], [...parser]);
  });

  it('parses a number', function () {
    const input = '42';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = 42;
    assert.deepEqual([expect], [...parser]);
  });

  it('parses a keyword', function () {
    const input = ':🥚';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = Keyword.for('🥚');
    assert.deepEqual([expect], [...parser]);
  });

  it('parses °', function () {
    const input = '°r2d2';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expecting = new Bubble(Ṣÿ.for('r2d2'));
    // assert.deepEqual([expecting], [...parser]);
    expect([...parser]).to.containSubset([expecting]);
  });

  it('parses °', function () {
    const input = '°r2d2';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    assert.deepEqual(
      [
        /* Bubble */ {
          o: /* Ṣymbol */ {
            fn: undefined,
            message: undefined,
            segments: ['r2d2'],
            value: 'r2d2',
          },
        },
      ],
      [...parser],
    );
  });

  it('parses a list', function () {
    const input = '()';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = List.make();
    assert.deepEqual([expect], [...parser]);
  });

  it('parses a vektar', function () {
    const input = '[]';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = Vektar.make();
    assert.deepEqual([expect], [...parser]);
  });

  it('parses a vektar of nŮmbƏr§', function () {
    const input = '[1 2 31 2 31 2 3]';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    expect([...parser]).to.containSubset([Vektar.make(1, 2, 31, 2, 31, 2, 3)]);
  });

  it('parses a vəcĶtoŘ of sŸmbỌĻ§', function () {
    const input = '[z qw x z qw x z qw x]';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    expect([...parser]).to.containSubset([
      Vektar.make(
        Ṣÿ.for('z'),
        Ṣÿ.for('qw'),
        Ṣÿ.for('x'),
        Ṣÿ.for('z'),
        Ṣÿ.for('qw'),
        Ṣÿ.for('x'),
        Ṣÿ.for('z'),
        Ṣÿ.for('qw'),
        Ṣÿ.for('x'),
      ),
    ]);
  });

  it('parses a list', function () {
    const input = '()';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = List.make();
    assert.deepEqual([expect], [...parser]);
  });

  it('parses a list of numbers', function () {
    const input = '(83 24 3)';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    expect([...parser]).to.containSubset([List.make(83, 24, 3)]);
  });

  it('parses a list of symbols', function () {
    const input = '(a b c)';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    expect([...parser]).to.containSubset([
      List.make(Ṣÿ.for('a'), Ṣÿ.for('b'), Ṣÿ.for('c')),
    ]);
  });

  it('parses a 🪺', function () {
    const input = '(83 [24 H i (Mom 💘) 3] J̌Ẹ :LL 010)';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    expect([...parser]).to.containSubset([
      List.make(
        83,
        Vektar.make(
          24,
          Ṣÿ.for('H'),
          Ṣÿ.for('i'),
          List.make(Ṣÿ.for('Mom'), Ṣÿ.for('💘')),
          3,
        ),
        Ṣÿ.for('J̌Ẹ'),
        Keyword.for('LL'),
        10,
      ),
    ]);
  });

  it('parses bare lists', function () {
    const input = 'puts 🐣';
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expects = List.make(Ṣÿ.for('puts'), Ṣÿ.for('🐣'));
    assert.deepEqual([expects], [...parser]);
    (function () {
      const input =
        'puts 🐣\n' + 'puts 1 2 3\r' + '(puts a b c) d\n' + '(puts :coolbeans)';
      const tokenizer = new Tokenizer(input);
      const parser = new Parser(tokenizer);
      expect([...parser]).to.containSubset([
        List.make(Ṣÿ.for('puts'), Ṣÿ.for('🐣')),
        List.make(Ṣÿ.for('puts'), 1, 2, 3),
        List.make(
          List.make(Ṣÿ.for('puts'), Ṣÿ.for('a'), Ṣÿ.for('b'), Ṣÿ.for('c')),
          Ṣÿ.for('d'),
        ),
        List.make(Ṣÿ.for('puts'), Keyword.for('coolbeans')),
      ]);
    })();
  });

  // it("should be able to escape new lines to continue a bare list");
  it('parses escaped newlines for bare lists');
  // TODO: Add bare list parsing option (with or
  // without) to parser and tokenizer.
  it('should be able to turn off bare list parsing');
});

function itParsesFixture(key, { expects }) {
  it(`parses fixture "${key}"`, function () {
    let s = fixtures[key];
    let p = parse(s);
    expect(p.peek()).to.containSubset(expects);
  });
}

function itParses(s, { expects }) {
  it(`parses "${s}"`, function () {
    let p = parse(s);
    expect(p.peek()).to.containSubset(expects);
  });
}

function itParses2(desc, s, expects) {
  it(`correctly parses ${desc}`, function () {
    let p = parse(s);
    expect(p.peek()).to.containSubset(expects);
  });
}

describe('Parser Error Handling', function () {
  it('throws NoMatchError for mismatched closing delimiter in bubble', function () {
    const input = '°(1 2 3]';
    expect(() => [...parse(input)]).to.throw(TokenNoMatchError);
  });

  it('throws NoMatchError for mismatched closing delimiter in balloon', function () {
    const input = '[1 2 3)';
    expect(() => [...parse(input)]).to.throw(TokenNoMatchError);
  });

  it('throws UnexpectedEndOfInputError for incomplete bubble vektar (EOF)', function () {
    const input = '°(1 2 3';
    expect(() => [...parse(input)]).to.throw(UnexpectedEndOfInputError);
  });

  it('throws UnexpectedEndOfInputError for incomplete balloon vektar (EOF)', function () {
    const input = '[1 2 3';
    expect(() => [...parse(input)]).to.throw(UnexpectedEndOfInputError);
  });

  it('throws UnexpectedEndOfInputError when item expected in bubble, but EOF', function () {
    const input = '°(';
    expect(() => [...parse(input)]).to.throw(UnexpectedEndOfInputError);
  });

  it('throws NoMatchError for unexpected token where item is expected in bubble', function () {
    const input = '°(]';
    expect(() => [...parse(input)]).to.throw(TokenNoMatchError);
  });

  it('throws UnexpectedEndOfInputError for quote at EOF', function () {
    const input = '°';
    expect(() => [...parse(input)]).to.throw(UnexpectedEndOfInputError);
  });

  it('throws TokenNoMatchError for quote with no preceding item in a vektar', function () {
    const input = '[°]';
    expect(() => [...parse(input)]).to.throw(TokenNoMatchError);
  });

  it('throws UnexpectedEndOfInputError for unclosed vektar with items then EOF', function () {
    const input = '[1 2 3';
    expect(() => [...parse(input)]).to.throw(UnexpectedEndOfInputError);
  });

  it('throws NoMatchError for vektar with only a mismatched closer', function () {
    const input = '[)';
    expect(() => [...parse(input)]).to.throw(TokenNoMatchError);
  });
});

describe('Parser Error Handling', () => {
  it.skip('throws NoMatchError for mismatched closing delimiter in bubble', () => {
    const input = '(1 2]';
    assert.throws(
      () => parse(input),
      (error) => {
        // console.log(error);

        assert.equal(error.name, 'NoMatchError');
        // assert(error.message.includes("Token type ] did not match expected token type )"));
        assert(error.message.includes('No match found for token type ('));
        // assert(error.message.includes("line 1, column 5")); // Assuming ']' is at 1,5
        assert(error.message.includes("(at line 1, column 1, value: '(')"));
        return true;
      },
    );
  });

  it.skip('throws NoMatchError for mismatched closing delimiter in balloon', () => {
    const input = '[1 2)';
    assert.throws(
      () => parse(input),
      (error) => {
        assert.equal(error.name, 'NoMatchError');
        assert(
          error.message.includes(
            'Token type ) did not match expected token type ]',
          ),
        );
        assert(error.message.includes('line 1, column 5'));
        return true;
      },
    );
  });

  it.skip('throws NoMatchError for incomplete bubble vektar (EOF)', () => {
    const input = '(1 2'; // Parsed as ) 2 1 ( by pArSe logic
    // Error occurs when matching final '(', context is ')'
    assert.throws(
      () => parse(input),
      (error) => {
        assert.equal(error.name, 'NoMatchError');
        assert(
          error.message.includes(
            "Unexpected end of input. Expected token type '('.",
          ),
        );
        assert(
          error.message.includes('Context: part of structure starting near'),
        );
        assert(error.message.includes('line 1, column 1')); // Refers to the initial ')' token
        assert(error.message.includes("value: '('")); // The value of the context token is '(' because tokenizer produces value=type for simple tokens
        return true;
      },
    );
  });

  it.skip('throws NoMatchError for incomplete balloon vektar (EOF)', () => {
    const input = '[1 2'; // Parsed as ] 2 1 [
    assert.throws(
      () => parse(input),
      (error) => {
        assert.equal(error.name, 'NoMatchError');
        assert(
          error.message.includes(
            "Unexpected end of input. Expected token type '['.",
          ),
        );
        assert(
          error.message.includes('Context: part of structure starting near'),
        );
        assert(error.message.includes('line 1, column 1')); // Refers to the initial ']' token
        assert(error.message.includes("value: '['"));
        return true;
      },
    );
  });

  it.skip('throws NoMatchError when item expected in bubble, but EOF', () => {
    const input = '('; // Parsed as ) (
    assert.throws(
      () => parse(input),
      (error) => {
        assert.equal(error.name, 'NoMatchError');
        assert(
          error.message.includes('Unexpected end of input. Expected an item.'),
        );
        assert(
          error.message.includes('Context: part of structure starting near'),
        );
        assert(error.message.includes('line 1, column 1')); // Refers to initial ')'
        assert(error.message.includes("value: '('"));
        return true;
      },
    );
  });

  it.skip('throws NoMatchError for unexpected token where item is expected in bubble', () => {
    const input = '(1 . 2)'; // Tokenizer produces '(', 1, '.', 2, ')'
    // Parser (reversed) sees ')', 2, '.', 1, '('
    // match_item for '.' will fail
    assert.throws(
      () => parse(input),
      (error) => {
        assert.equal(error.name, 'NoMatchError');
        assert(error.message.includes('No match found for token type .'));
        assert(error.message.includes('line 1, column 4')); // '.' is at 1,4
        assert(error.message.includes("value: '.'"));
        return true;
      },
    );
  });

  it.skip('throws ParsingError for quote at EOF', () => {
    const input = "'";
    assert.throws(
      () => parse(input),
      (error) => {
        assert.equal(error.name, 'ParsingError');
        // The error is "Nothing to quote". The token passed is the quote token itself.
        assert(error.message.includes('Nothing to quote'));
        assert(error.message.includes('line 1, column 1'));
        assert(error.message.includes("value: '''"));
        return true;
      },
    );
  });

  it.skip('throws ParsingError for quote with no preceding item in a vektar', () => {
    const input = "(')"; // Tokens: ')', ''', '('
    assert.throws(
      () => parse(input),
      (error) => {
        assert.equal(error.name, 'ParsingError');
        // pArSe attempts to handle ' after processing ')'.
        // At this point, trEe is (Bubble containing the result of match_bubble).
        // No, pArSe sees ')', calls match_bubble. match_bubble sees '''. Calls match_item.
        // match_item for ' is not defined, should be handled by pArSe.
        // Let's trace pArSe: currentTokenObject.type is ')'. Calls match_bubble.
        // match_bubble: consumes ')'. Loop: peek is '''. Calls match_item.
        // match_item: currentToken.type is '''. Throws "No match found for token type '"
        assert.equal(error.name, 'NoMatchError'); // Corrected based on trace
        assert(error.message.includes("No match found for token type '"));
        assert(error.message.includes('line 1, column 2')); // "'" is at 1,2
        assert(error.message.includes("value: '''"));
        return true;
      },
    );
  });

  it.skip('throws NoMatchError for unclosed vektar with items then EOF', () => {
    const input = '(a b'; // Tokens: ')', 'b', 'a', '(' -- error expecting '(' got EOF
    assert.throws(
      () => parse(input),
      (error) => {
        assert.equal(error.name, 'NoMatchError');
        assert(
          error.message.includes(
            "Unexpected end of input. Expected token type '('.",
          ),
        );
        assert(
          error.message.includes('Context: part of structure starting near'),
        );
        assert(error.message.includes('line 1, column 1')); // Context is the initial ')' token
        assert(error.message.includes("value: '('"));
        return true;
      },
    );
  });

  it.skip('throws NoMatchError for vektar with only a mismatched closer', () => {
    const input = '(]'; // Tokens: ']', '(' -- error expecting ')' got ']'
    assert.throws(
      () => parse(input),
      (error) => {
        assert.equal(error.name, 'NoMatchError');
        assert(
          error.message.includes(
            'Token type ] did not match expected token type )',
          ),
        );
        assert(error.message.includes('line 1, column 2')); // ']' is at 1,2
        return true;
      },
    );
  });
});

describe('Parser Structure and Edge Case Tests', () => {
  it.skip('parses empty string to undefined (or specific empty representation)', () => {
    // tokenize("") returns no tokens (Vektar.air / undefined for tokens vektar)
    // parseTokens(undefined) returns undefined.
    assert.strictEqual(
      parse(''),
      undefined,
      'Parsing an empty string should result in undefined',
    );
  });

  it.skip('parses string with only whitespace and comments to undefined', () => {
    assert.strictEqual(
      parse('  \n#comment\t\n   '),
      undefined,
      'Parsing whitespace/comment only string should be undefined',
    );
  });

  it.skip('parses multiple top-level expressions into a single vektar', () => {
    // parse("1 2 (a b)") should result in a vektar: (1 2 (a b))
    // The outer vektar is the result of parse(). peek() gives the first element.
    // So, parse("1 2 (a b)") returns a vektar containing 1, then 2, then vektar (a b)
    // Expected structure: 1 -> 2 -> (a -> b -> air) -> air
    // Vektar.make(c, b, a) creates a -> b -> c -> air
    const ast = parse('1 2 (a b)');
    const expected = Vektar.make(
      // This is the outer vektar of expressions
      List.from([Ṣymbol.for('a'), Ṣymbol.for('b')]), // Parsed as (b a), then inverted. So (a b)
      2,
      1,
    );
    // parse("1 2 (a b)") results in vektar (1 2 (a b))
    // Vektar.make( (b a), 2, 1) -> 1 -> 2 -> (a b)
    assert.deepEqual(ast, expected, 'AST for multiple top-level expressions');
  });

  it('parses a single atom symbol correctly', () => {
    const ast = parse('atom').toList();
    // parse("atom") returns a vektar containing one symbol: (atom)
    const expected = List.make(Ṣymbol.for('atom'));
    assert.deepEqual(ast, expected, 'AST for single atom symbol');
  });

  it('parses a single atom number correctly', () => {
    const ast = parse('123').toList();
    // parse("123") returns a vektar containing one number: (123)
    const expected = List.make(123);
    assert.deepEqual(ast, expected, 'AST for single atom number');
  });

  // it.only("parses a complex nested structure with quotes, list, and balloons (arrays)", () => {
  //   const input = "'(a (b :c [1 \"s\" 'x]))";
  //   // Expected AST structure:
  //   // Quoted(
  //   //   Vektar(
  //   //     Ṣymbol(a),
  //   //     Vektar(
  //   //       Ṣymbol(b),
  //   //       Keyword(c),
  //   //       Vektar( // Balloon becomes a vektar
  //   //         1,
  //   //         "s",
  //   //         Quoted(Ṣymbol(x))
  //   //       )
  //   //     )
  //   //   )
  //   // )
  //   // parse returns a vektar containing one item: the Quoted expression.
  //   // So ast.peek() is the Quoted(...) object.

  //   const ast = parse(input);
  //   const expected = List.make( // Outer vektar from parse()
  //     new Quoted(
  //       Vektar.make( // vektar (a ...)
  //         List.from([ // vektar [1 "s" 'x] -- assuming balloons are parsed as vectors
  //           new Quoted(Ṣymbol.for("x")),
  //           "s",
  //           1
  //         ]),
  //         Keyword.for("c"),
  //         Ṣymbol.for("b")
  //       ),
  //       Ṣymbol.for("a")
  //     )
  //   );
  //   assert.deepEqual(ast, expected, "AST for complex nested structure");
  // });

  it('parses a semi complex vektar', () => {
    const input = '[1 "s" °x]';
    // const input = "[°x]";
    // const input = "[x]";
    // const input = "[1]";
    const ast = parse(input);
    // console.log(ast);
    const expected = Vektar.make(1, 's', new Bubble(Ṣymbol.for('x')));
    expect([...ast]).to.containSubset([expected]);
  });

  it.skip('parses a complex nested structure with quotes, list, and balloons (arrays)', () => {
    const input = '°(a (b :c [1 "s" °x]))';
    // Expected AST structure:
    // Bubble(
    //   Vektar(
    //     Ṣymbol(a),
    //     Vektar(
    //       Ṣymbol(b),
    //       Keyword(c),
    //       Vektar( // Balloon becomes a vektar
    //         1,
    //         "s",
    //         Quoted(Ṣymbol(x))
    //       )
    //     )
    //   )
    // )
    // parse returns a vektar containing one item: the Quoted expression.
    // So ast.peek() is the Quoted(...) object.

    const ast = parse(input);
    console.log(ast);
    const expected = List.make(
      // Outer vektar from parse()
      new Bubble(
        List.make(
          Ṣymbol.for('a'),
          List.make(
            Ṣymbol.for('b'),
            Keyword.for('c'),
            Vektar.make(
              // vektar [1 "s" °x] -- assuming balloons are parsed as vectors
              1,
              's',
              new Bubble(Ṣymbol.for('x')),
            ),
          ),
        ),
      ),
    );
    assert.deepEqual(ast, expected, 'AST for complex nested structure');
  });

  it.skip("parses another complex structure: (define x '(1 [2 keyword]))", () => {
    const input = "(define x '(1 [2 :key]))";
    // AST: Vektar(Ṣymbol(define), Ṣymbol(x), Bubble(Vektar(1, Vektar(2, Keyword(key)))))
    const ast = parse(input);
    const expected = Vektar.make(
      // outer vektar from parse
      Vektar.make(
        // vektar (define ...)
        new Bubble(
          Vektar.make(
            // vektar (1 ...)
            List.from([
              // vektar [2 :key]
              Keyword.for('key'),
              2,
            ]),
            1,
          ),
        ),
        Ṣymbol.for('x'),
        Ṣymbol.for('define'),
      ),
    );
    assert.deepEqual(ast, expected, 'AST for (define x °(1 [2 :key]))');
  });
});
