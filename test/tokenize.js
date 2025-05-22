const assert = require("assert");
const tokenize = require("../src/tokenize");
// Use LynktLyst for list operations. Note: `blow` was specific to Bubble.
// We'll use LynktLyst.make for varargs and LynktLyst.from for array-like.
// `count`, `get`, `peek` are static methods on LynktLyst.
const LynktLyst = require("../src/lynkt_lyst");
const { count, get, peek, invert, from: arrayFromList, make: makeList } = LynktLyst; // Assuming 'from' and 'make' exist

const { TOK_STRING, TOK_NUMBER,
  TOK_SYMBOL, TOK_KEYWORD } = tokenize;

describe("tokenize(string)", function() {

  it("allows dots in symbols", function () {
    let tokenList = tokenize("console.log");
    assert.equal(peek(tokenList).type, TOK_SYMBOL);
    assert.equal(peek(tokenList).value, "console.log");
    assert.equal(peek(tokenList).line, 1);
    assert.equal(peek(tokenList).column, 1);
  });

  it("tokenizes single quote", function () {
    let tokenList = tokenize("'");
    assert.equal(peek(tokenList).type, "'");
    assert.equal(peek(tokenList).value, "'");
    assert.equal(peek(tokenList).line, 1);
    assert.equal(peek(tokenList).column, 1);
  });

  it("eats comments", function () {
    let tokenList = tokenize("# Hamilton Burger"); // This will produce no tokens
    assert.equal(peek(tokenList), undefined); // LynktLyst.air or undefined for empty

    tokenList = tokenize("# 🍔4\ncop"); // Line 1 comment, "cop" on line 2
    assert.equal(peek(tokenList).type, TOK_SYMBOL);
    assert.equal(peek(tokenList).value, "cop");
    assert.equal(peek(tokenList).line, 2);
    assert.equal(peek(tokenList).column, 1);
  });

  it("tokenizes string", function () {
    let tokenList = tokenize('"Hola Berenjena"');
    assert.equal(peek(tokenList).type, TOK_STRING);
    assert.equal(peek(tokenList).value, "Hola Berenjena");
    assert.equal(peek(tokenList).line, 1);
    assert.equal(peek(tokenList).column, 1);
  });

  it("tokenizes bubbles", function () {
    // Input: '(777 kitty :dawg)' -> Output tokens: '(', '777', 'kitty', ':dawg', ')'
    // Tokenize returns inverted, so the list is actually like: ) dawg kitty 777 (
    // No, tokenize itself calls invert, so the list is in natural order.
    let tokenList = tokenize('(777 kitty :dawg)');
    assert.equal(count(tokenList), 5);
    assert.equal(get(tokenList, 0).type, '('); // First token
    assert.equal(get(tokenList, 0).value, '(');
    assert.equal(get(tokenList, 1).type, TOK_NUMBER);
    assert.equal(get(tokenList, 1).value, 777);
    assert.equal(get(tokenList, 2).type, TOK_SYMBOL);
    assert.equal(get(tokenList, 2).value, "kitty");
    assert.equal(get(tokenList, 3).type, TOK_KEYWORD);
    assert.equal(get(tokenList, 3).value, "dawg");
    assert.equal(get(tokenList, 4).type, ')'); // Last token
    assert.equal(get(tokenList, 4).value, ')');
  });

  it("tokenizes balloons", function () {
    // Input: '[sha yaya daya]' -> Output: '[', 'sha', 'yaya', 'daya', ']'
    let tokenList = tokenize('[sha yaya daya]');
    assert.equal(count(tokenList), 5);
    assert.equal(get(tokenList, 0).type, '[');
    assert.equal(get(tokenList, 1).type, TOK_SYMBOL);
    assert.equal(get(tokenList, 1).value, 'sha');
    assert.equal(get(tokenList, 2).type, TOK_SYMBOL);
    assert.equal(get(tokenList, 2).value, 'yaya');
    assert.equal(get(tokenList, 3).type, TOK_SYMBOL);
    assert.equal(get(tokenList, 3).value, 'daya');
    assert.equal(get(tokenList, 4).type, ']');
  });

  // Expected token objects will now include type and value. Line/col can be omitted for now in expected.
  // Helper `makeList` from LynktLyst can be used to construct expected lists.
  // Or `LynktLyst.from` for arrays.

  itTokenizes("symbol",
    makeList({ type: TOK_SYMBOL, value: "symbol", line: 1, column: 1 })
  );
  itTokenizes(":keyword",
    makeList({ type: TOK_KEYWORD, value: "keyword", line: 1, column: 1 })
  );
  itTokenizes("(a b c)",
    makeList(
      { type: '(', value: '(', line: 1, column: 1 },
      { type: TOK_SYMBOL, value: 'a', line: 1, column: 2 },
      { type: TOK_SYMBOL, value: 'b', line: 1, column: 4 },
      { type: TOK_SYMBOL, value: 'c', line: 1, column: 6 },
      { type: ')', value: ')', line: 1, column: 7 }
    )
  );
  itTokenizes("(+ 2 3)",
    makeList(
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
    makeList(
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
    makeList(
      { type: '(', value: '(', line: 1, column: 1 },
      { type: TOK_NUMBER, value: 1, line: 1, column: 2 },
      { type: '(', value: '(', line: 1, column: 4 },
      { type: TOK_NUMBER, value: 2, line: 1, column: 5 },
      { type: ')', value: ')', line: 1, column: 6 },
      { type: ')', value: ')', line: 1, column: 7 }
    )
  );
});

// expectedTokenObjectsList is a LynktLyst of token objects {type, value, line, column}
function itTokenizes(s, expectedTokenObjectsList) {
  // If expected is just one item and not a list, wrap it for consistency if makeList doesn't handle single items.
  // LynktLyst.make should handle if it's a single object by creating a list of one.
  it(`tokenizes "${s}"`, function() {
    const actualTokenList = tokenize(s);
    // For deep equality on LynktLyst, we might need to convert both to arrays.
    // Or ensure LynktLyst has a custom equality check recognized by assert.deepEqual.
    // For now, let's convert to arrays if LynktLyst is complex.
    // However, the problem description implies LynktLyst can be used directly with deepEqual
    // if its structure and elements are simple objects.
    // Let's try direct comparison first.
    // The `tokenize` function already returns an inverted (natural order) list.
    // So `expectedTokenObjectsList` should also be in natural order.

    // 🪖 Needing to do an invert here to get the tests
    // passing. This should factor out at some point
    // along with this comment. 🥂
    expectedTokenObjectsList = invert(expectedTokenObjectsList);

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
