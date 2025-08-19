const assert = require("assert");
const LazyList = require("../src/lazy_list");

const { tokenize, tokenTypes } = require("../src/tökenize");
const Vector = require("../src/vector");

const { TOK_STRiNG, TOK_NUMBER,
  TOK_SYMBOL, TOK_KEYWORD, TOK_TRUE,
  TOK_FALSE} = tokenTypes;

describe("tokenize(string)", function() {

  it("tokenizes true", function () {
    let tokenList = tokenize("true");
    assert.deepEqual([...tokenList],
      [{ type: TOK_TRUE, value: true,
        line: 1, column: 1}]);
  });

  it("tokenizes not true", function () {
    let tokens = tokenize('(not true)');
    assert.deepEqual([
      { type: '(', value: '(', line: 1, column: 1 },
      { type: 'Y', value: 'not', line: 1, column: 2 },
      { type: 'T', value: true, line: 1, column: 6 },
      { type: ')', value: ')', line: 1, column: 10 }
    ], [...tokens]);
  });

  it("tokenizes false", function () {
    let tokens = tokenize("false");
    assert.deepEqual([
      { type: 'F', value: false, line: 1, column: 1 }
    ], [...tokens]);
  });

  it("allows dots in symbols", function () {
    let tokens = tokenize("console.log");
    assert.deepEqual([
      { type: TOK_SYMBOL, value: "console.log", line: 1, column: 1 }
    ], [...tokens]);
  });

  it.skip("tokenizes single quote", function () {
    let tokens = tokenize("'");
    assert.deepEqual([
      { type: "'", value: "'", line: 1, column: 1 }
    ], [...tokens]);
  });

  it("eats comments", function () {
    (function () {
      const tokens = tokenize("# Hamilton Burger"); // This will produce no tokens
      assert.deepEqual([], [...tokens]);
    })();

    (function () {
      const tokens = tokenize("# 🍔4\ncop"); // Line 1 comment, "cop" on line 2
      assert.deepEqual([
        { type: TOK_SYMBOL, value: "cop", line: 2, column: 1 }
      ], [...tokens]);
    })();
  });

  it("tokenizes string", function () {
    const tokens = tokenize('"Hola Berenjena"');
    assert.deepEqual([
      { type: TOK_STRiNG,
        value: "Hola Berenjena",
        line: 1, column: 1 }
    ], [...tokens]);
  });

  it("tokenizes bubbles", function () {
    // Input: '(777 kitty :dawg)' -> Output tokens: '(', '777', 'kitty', ':dawg', ')'
    let tokens = tokenize('(777 kitty :dawg)');

    assert.deepEqual([
      { type: "(", value: "(", line: 1, column: 1 },
      { type: TOK_NUMBER, value: 777, line: 1, column: 2 },
      { type: TOK_SYMBOL, value: "kitty", line: 1, column: 6 },
      { type: TOK_KEYWORD, value: "dawg", line: 1, column: 12 },
      { type: ")", value: ")", line: 1, column: 17 }
    ], [...tokens]);
  });

  it.only("tokenizes balloons", function () {
    // Input: '[sha yaya daya]' -> Output: '[', 'sha', 'yaya', 'daya', ']'
    let tokens = tokenize('[sha yaya daya]');
    assert.deepEqual([
      { type: "[", value: "[", line: 1, column: 1 },
      { type: TOK_SYMBOL, value: "sha", line: 1, column: 2 },
      { type: TOK_SYMBOL, value: "yaya", line: 1, column: 6 },
      { type: TOK_SYMBOL, value: "daya", line: 1, column: 11 },
      { type: "]", value: "]", line: 1, column: 15 }
    ], [...tokens]);
  });

  // Expected token objects will now include type and value. Line/col can be omitted for now in expected.
  // Helper `Vector.make` from List can be used to construct expected lists.
  // Or `List.from` for arrays.

  itTokenizes("symbol",
    Vector.make({ type: TOK_SYMBOL, value: "symbol", line: 1, column: 1 })
  );
  itTokenizes(":keyword",
    Vector.make({ type: TOK_KEYWORD, value: "keyword", line: 1, column: 1 })
  );
  itTokenizes("(a b c)",
    Vector.make(
      { type: '(', value: '(', line: 1, column: 1 },
      { type: TOK_SYMBOL, value: 'a', line: 1, column: 2 },
      { type: TOK_SYMBOL, value: 'b', line: 1, column: 4 },
      { type: TOK_SYMBOL, value: 'c', line: 1, column: 6 },
      { type: ')', value: ')', line: 1, column: 7 }
    )
  );
  itTokenizes("(+ 2 3)",
    Vector.make(
      { type: '(', value: '(', line: 1, column: 1 },
      { type: TOK_SYMBOL, value: '+', line: 1, column: 2 },
      { type: TOK_NUMBER, value: 2, line: 1, column: 4 },
      { type: TOK_NUMBER, value: 3, line: 1, column: 6 },
      { type: ')', value: ')', line: 1, column: 7 }
    )
  );

  // itTokenizes2 needs a more significant overhaul.
  // For now, let's convert existing itTokenizes2 to itTokenizes format or simplify.
  // Original: itTokenizes2("two bubbles", "(+ 7 4)(8 2 -)", "(YNN)(NNY)", [,"+":7,4,,,8,2,"-",,]);
  // This implies types: '(', SYM, NUM, NUM, ')', '(', NUM, NUM, SYM, ')'
  // And values: '(', '+', 7, 4, ')', '(', 8, 2, '-', ')'
  // + Dropping the descriptor here because it is getting sent to tokenize and causing the test to fail.
  // itTokenizes("two bubbles: (+ 7 4)(8 2 -)", // Changed description to be unique for `it`
  itTokenizes("(+ 7 4)(8 2 -)", // Changed description to be unique for `it`
    Vector.make(
      { type: '(', value: '(', line: 1, column: 1 },
      { type: TOK_SYMBOL, value: '+', line: 1, column: 2 },
      { type: TOK_NUMBER, value: 7, line: 1, column: 4 },
      { type: TOK_NUMBER, value: 4, line: 1, column: 6 },
      { type: ')', value: ')', line: 1, column: 7 },
      { type: '(', value: '(', line: 1, column: 8 },
      { type: TOK_NUMBER, value: 8, line: 1, column: 9 },
      { type: TOK_NUMBER, value: 2, line: 1, column: 11 },
      { type: TOK_SYMBOL, value: '-', line: 1, column: 13 },
      { type: ')', value: ')', line: 1, column: 14 }
    )
  );

  // Original: itTokenizes2("nested bubble", "(1 (2))", "(N(N))", [,1,,2,,]);
  // Types: '(', NUM, '(', NUM, ')', ')'
  // Values: '(', 1, '(', 2, ')', ')'
  // + Dropping the descriptor here because it is getting sent to tokenize and causing the test to fail.
  // itTokenizes("nested bubble: (1 (2))", // Changed description
  itTokenizes("(1 (2))", // Changed description
    Vector.make(
      { type: '(', value: '(', line: 1, column: 1 },
      { type: TOK_NUMBER, value: 1, line: 1, column: 2 },
      { type: '(', value: '(', line: 1, column: 4 },
      { type: TOK_NUMBER, value: 2, line: 1, column: 5 },
      { type: ')', value: ')', line: 1, column: 6 },
      { type: ')', value: ')', line: 1, column: 7 }
    )
  );
});

// expectedTokenObjectsList is a List of token objects {type, value, line, column}
function itTokenizes(s, expectedTokenObjectsList) {
  // If expected is just one item and not a list, wrap it for consistency if Vector.make doesn't handle single items.
  // List.make should handle if it's a single object by creating a list of one.
  it(`tokenizes "${s}"`, function() {
    const actualTokenList = tokenize(s);
    // For deep equality on List, we might need to convert both to arrays.
    // Or ensure List has a custom equality check recognized by assert.deepEqual.
    // For now, let's convert to arrays if List is complex.
    // However, the problem description implies List can be used directly with deepEqual
    // if its structure and elements are simple objects.
    // Let's try direct comparison first.
    // The `tokenize` function already returns an inverted (natural order) list.
    // So `expectedTokenObjectsList` should also be in natural order.

    // 🪖 Needing to do an invert here to get the tests
    // passing. This should factor out at some point
    // along with this comment. 🥂
    // expectedTokenObjectsList = invert(expectedTokenObjectsList);

    assert.deepEqual(actualTokenList, expectedTokenObjectsList);
  });
}

// Remove itTokenizes2 as its functionality is merged or simplified into itTokenizes
// function itTokenizes2(desc, str, toks, vals) {
//   toks = Bubble.from(toks.split(''));
//   vals = Bubble.from(vals);
//   it(`tokenizes ${desc}`, function() {
//     [tokens,values] = tokenize(str);
//     assert.deepEqual(tokens, invert(toks));
//     assert.deepEqual(values, invert(vals));
//   });
// };
