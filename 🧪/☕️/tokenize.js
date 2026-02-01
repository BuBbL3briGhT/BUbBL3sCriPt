import assert from "node:assert";
import { it, describe } from "mocha";
import { tokenize, tokenTypes, Tokenizer }
                      from "../../☕️/tokenize.js";

const { TOK_STRiNG, TOK_NUMBER,
  TOK_SYMBOL, TOK_KEYWORD, TOK_TRUE } = tokenTypes;

describe("tokenize(string)", function() {

  // it("tekenizes ```string\n  string```", function {
  //   const tokens = tokenize("hai");
  // });

  it("tokenizes (:)", function () {
    const tokens = tokenize('(:)');
    assert.deepEqual([
      { type: '(', value: '(', line: 1, column: 1 },
      { type: TOK_SYMBOL, value: ":", line: 1,
        column: 2 },
      { type: ')', value: ')', line: 1, column: 3 }
    ], [...tokens]);
  });

  it("tokenizes :", function () {
    let tokenList = tokenize(":");
    assert.deepEqual([...tokenList],
      [{ type: TOK_SYMBOL, value: ":",
        line: 1, column: 1}]);
  });

  it("tokenizes true", function () {
    let tokenList = tokenize("true");
    assert.deepEqual([...tokenList],
      [{ type: TOK_TRUE, value: true,
        line: 1, column: 1}]);
  });

  it("tokenizes not true", function () {
    const tokens = tokenize('(not true)');
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

  it("tokenizes balloons", function () {
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

  itTokenizes("symbol",
    { type: TOK_SYMBOL, value: "symbol", line: 1, column: 1 }
  );
  itTokenizes(":keyword",
    { type: TOK_KEYWORD, value: "keyword", line: 1, column: 1 }
  );
  itTokenizes("(a b c)",
    { type: '(', value: '(', line: 1, column: 1 },
    { type: TOK_SYMBOL, value: 'a', line: 1, column: 2 },
    { type: TOK_SYMBOL, value: 'b', line: 1, column: 4 },
    { type: TOK_SYMBOL, value: 'c', line: 1, column: 6 },
    { type: ')', value: ')', line: 1, column: 7 }
  );
  itTokenizes("(+ 2 3)",
    { type: '(', value: '(', line: 1, column: 1 },
    { type: TOK_SYMBOL, value: '+', line: 1, column: 2 },
    { type: TOK_NUMBER, value: 2, line: 1, column: 4 },
    { type: TOK_NUMBER, value: 3, line: 1, column: 6 },
    { type: ')', value: ')', line: 1, column: 7 }
  );

  // itTokenizes2 needs a more significant overhaul.
  // For now, let's convert existing itTokenizes2 to itTokenizes format or simplify.
  // Original: itTokenizes2("two bubbles", "(+ 7 4)(8 2 -)", "(YNN)(NNY)", [,"+":7,4,,,8,2,"-",,]);
  // This implies types: '(', SYM, NUM, NUM, ')', '(', NUM, NUM, SYM, ')'
  // And values: '(', '+', 7, 4, ')', '(', 8, 2, '-', ')'
  // + Dropping the descriptor here because it is getting sent to tokenize and causing the test to fail.
  // itTokenizes("two bubbles: (+ 7 4)(8 2 -)", // Changed description to be unique for `it`
  itTokenizes("(+ 7 4)(8 2 -)", // Changed description to be unique for `it`
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
  );

  // Original: itTokenizes2("nested bubble", "(1 (2))", "(N(N))", [,1,,2,,]);
  // Types: '(', NUM, '(', NUM, ')', ')'
  // Values: '(', 1, '(', 2, ')', ')'
  // + Dropping the descriptor here because it is getting sent to tokenize and causing the test to fail.
  // itTokenizes("nested bubble: (1 (2))", // Changed description
  itTokenizes("(1 (2))", // Changed description
    { type: '(', value: '(', line: 1, column: 1 },
    { type: TOK_NUMBER, value: 1, line: 1, column: 2 },
    { type: '(', value: '(', line: 1, column: 4 },
    { type: TOK_NUMBER, value: 2, line: 1, column: 5 },
    { type: ')', value: ')', line: 1, column: 6 },
    { type: ')', value: ')', line: 1, column: 7 }
  );
});


describe("Tokenizer", function () {

  it("tokenizes the number 1", function () {
    const tokenizer = new Tokenizer("1");
    assert.deepEqual([
      { type: 'N', value: 1,
        line: 1, column: 1 }
    ], [...tokenizer]);
  });

  it("tokenizes the number 12", function () {
    const tokenizer = new Tokenizer("12");
    assert.deepEqual([
      { type: 'N', value: 12,
        line: 1, column: 1 }
    ], [...tokenizer]);
  });

  it("tokenizes numbers", function () {
    (function (assert = assertTokenizesNumber) {
      assert("0", 0);
      assert("1", 1);
      assert("2", 2);
      assert("3", 3);
      assert("4", 4);
      assert("5", 5);
      assert("6", 6);
      assert("7", 7);
      assert("8", 8);
      assert("9", 9);
      assert("1234567890", 1234567890);
      assert("0123456789", 123456789);

      // Deciminals
      assert("0.1", 0.1);
      assert("1.1", 1.1);
      assert("22.22", 22.22);
      assert("333.333", 333.333);
      assert("-1", -1);
    }());

  });

  it("tokenizes the number zero", function () {
    const input = "0";
    const tokenizer = new Tokenizer(input);
    console.log([...tokenizer]);
    // assert.deepEqual(expects,
    //   [...tokenizer]);
  });

  it("tokenizes a symbol", function () {
    (function (assert = assertTokenizesSymbol) {
      assert("symbol", "symbol");
      assert("lobmys", "lobmys");
      assert("SyMBoL", "SyMBoL");
      assert("SYMBOL", "SYMBOL");
      assert("symbol123", "symbol123");
    })();
  });

  it("tokenizes a symbol", function () {
    let tokenizer = new Tokenizer('symbol');
    assert.deepEqual([
      {
        type: 'Y', value: 'symbol',
        line: 1, column: 1
      }
    ], [...tokenizer]);
  });

  it("tokenizes (", function () {
    assertTokenizes('(', {
      type: "(", value: "(",
      line: 1, column: 1
    });
  });

  it("tokenizes )", function () {
    assertTokenizes(')', {
      type: ")", value: ")",
      line: 1, column: 1
    });
  });

  it("tokenizes ,", function () {
    assertTokenizes(',', {
      type: ",", value: ",",
      line: 1, column: 1
    });
    assertTokenizes('a,', {
        type: "Y", value: "a",
        line: 1, column: 1
      }, {
        type: ",", value: ",",
        line: 1, column: 2
      });
  });

  it("tokenizes ;", function () {
    assertTokenizes(';', {
      type: ";", value: ";",
      line: 1, column: 1
    });
    assertTokenizes('a;', {
        type: "Y", value: "a",
        line: 1, column: 1
      }, {
        type: ";", value: ";",
        line: 1, column: 2
      });
  });

  it("tokenizes [", function () {
    assertTokenizes('[', {
      type: "[", value: "[",
      line: 1, column: 1
    });
  });

  it("tokenizes ]", function () {
    assertTokenizes(']', {
      type: "]", value: "]",
      line: 1, column: 1
    });
  });

  it("tokenizes °", function () {
    assertTokenizes('°', {
      type: "°", value: "°",
      line: 1, column: 1
    });
  });

  it("tokenizes ()[]{}.°", function () {
    let tokenizer = new Tokenizer("()[]{}.°");
    assert.deepEqual([
      {
        type: '(', value: '(',
        line: 1, column: 1
      }, {
        type: ')', value: ')',
        line: 1, column: 2
      }, {
        type: '[', value: '[',
        line: 1, column: 3
      }, {
        type: ']', value: ']',
        line: 1, column: 4
      }, {
        type: '{', value: '{',
        line: 1, column: 5
      }, {
        type: '}', value: '}',
        line: 1, column: 6
      }, {
        type: '.', value: '.',
        line: 1, column: 7
      }, {
        type: '°', value: '°',
        line: 1, column: 8
      }
    ], [...tokenizer]);
  });

  it("tokenizes a\\nb\\rc", function () {
    let tokenizer = new Tokenizer("a\nb\rc");
    assert.deepEqual([
      {
        type: 'Y', value: 'a',
        line: 1, column: 1
      }, {
        type: 'L', value: '\n',
        line: 1, column: 2
      }, {
        type: 'Y', value: 'b',
        line: 2, column: 1
      }, {
        type: 'L', value: '\r',
        line: 2, column: 2
      }, {
        type: 'Y', value: 'c',
        line: 3, column: 1
      }
    ], [...tokenizer]);
  });

  it("tokenizes a string", function () {
    let tokenizer = new Tokenizer('"string"');
    assert.deepEqual([
      {
        type: 'S', value: 'string',
        line: 1, column: 1
      }
    ], [...tokenizer]);
  });

  it("throw error for unterminated strings");

  it("tokenizes true", function () {
    let tokenizer = new Tokenizer('true');
    assert.deepEqual([
      {
        type: 'T', value: true,
        line: 1, column: 1
      }
    ], [...tokenizer]);
  });

  it("tokenizes false", function () {
    let tokenizer = new Tokenizer('false');
    assert.deepEqual([
      {
        type: 'F', value: false,
        line: 1, column: 1
      }
    ], [...tokenizer]);
  });

  it("tokenizes a number", function () {
    const tokenizer = new Tokenizer("1");
    assert.deepEqual([
      { type: 'N', value: 1,
        line: 1, column: 1 }
    ], [...tokenizer]);
  });

  it("tokenizes a keyword", function () {
    const tokenizer = new Tokenizer(":keyword");
    assert.deepEqual([
      { type: 'K', value: "keyword",
        line: 1, column: 1 }
    ], [...tokenizer]);
  });

  it("tokenizes everything", function () {
    let tokenizer = new Tokenizer('"string" symbol :keyword 777 12.333');
    assert.deepEqual([
      { type: 'S', value: 'string',
        line: 1, column: 1
      }, {
        type: 'Y', value: 'symbol',
        line: 1, column: 10
      }, {
        type: 'K', value: 'keyword',
        line: 1, column: 17
      }, {
        type: 'N', value: 777,
        line: 1, column: 26
      }, {
        type: 'N', value: 12.333,
        line: 1, column: 30
      }
    ], [...tokenizer]);
  });

  it("eats comments", function () {
    const tokenizer = new Tokenizer("# comment...");
    assert.deepEqual([], [...tokenizer]);
  });

  it("tokenize new lines", function () {
    const tokenizer = new Tokenizer("\n");
    assert.deepEqual([
      { type: 'L', value: "\n",
        line: 1, column: 1 }
    ], [...tokenizer]);
  });


  (function () {
    const string = "(apple 🍏 orange 🍊 pina 🪅)";
    it("tokenizes " + string, function () {
      let tokenizer = new Tokenizer(string, { filePath: "imaginary" });
      assert.deepEqual({ type: '(', value: '(',
        line: 1, column: 1, filePath:
        'imaginary' }, { type: 'Y', value:
          'apple', line: 1, column: 2, filePath:
          'imaginary' }, { type: 'Y', value:
            '🍏', line: 1, column: 8, filePath:
            'imaginary' }, { type: 'Y', value:
              'orange', line: 1, column: 11,
              filePath: 'imaginary' }, { type:
                'Y', value: '🍊', line: 1,
                column: 18, filePath:
                'imaginary' }, { type: 'Y',
                  value: 'pina', line: 1,
                  column: 21, filePath:
                  'imaginary' }, { type: 'Y',
                      value: '🪅', line: 1,
                      column: 26, filePath:
                    'imaginary' }, { type: ')',
                      value: ')', line: 1,
                      column: 28, filePath:
                      'imaginary' }, [...tokenizer]);
    });
  });


  (function () {

     const inpůt =
      "(83 [24 (💘 Mom) 3] JE :LL 010)";

     it("tokenizes " + inpůt, function () {

         const tokenizer = new Tokenizer(inpůt);

         const expects = [
              { type: '(', value: '(', line: 1, column: 1 },   { type: 'N', value: 83, line: 1, column: 2 },    { type: '[', value: '[', line: 1, column: 5 },   { type: 'N', value: 24, line: 1, column: 6 },
              { type: '(', value: '(', line: 1, column: 9 },   { type: 'Y', value: '💘', line: 1, column: 10 },                                                  { type: 'Y', value: 'Mom', line: 1, column: 13 },                                                 { type: ')', value: ')', line: 1, column: 16 },
              { type: 'N', value: 3, line: 1, column: 18 },    { type: ']', value: ']', line: 1, column: 19 },  { type: 'Y', value: 'JE', line: 1, column: 21 },
              { type: 'K', value: 'LL', line: 1, column: 24 },
              { type: 'N', value: 10, line: 1, column: 28 },   { type: ')', value: ')', line: 1, column: 31 }
            ]

         assert.deepEqual(expects, [...tokenizer]);
     });

  })();

  it("etc, etc...", function () {
    let tokenizer = new Tokenizer("((love))");
    assert.deepEqual([
      {
        type: '(', value: '(',
        line: 1, column: 1
      }, {
        type: '(', value: '(',
        line: 1, column: 2
      }, {
        type: 'Y', value: 'love',
        line: 1, column: 3
      }, {
        type: ')', value: ')',
        line: 1, column: 7
      }, {
        type: ')', value: ')',
        line: 1, column: 8
      }
    ], [...tokenizer]);
  });
});


// expectedTokenObjectsList is a List of token objects {type, value, line, column}
function itTokenizes(s, ...expectedTokens) {
  // If expected is just one item and not a list, wrap it for consistency if Vektar.make doesn't handle single items.
  // List.make should handle if it's a single object by creating a list of one.
  it(`tokenizes "${s}"`, function() {
    const actualTokens = tokenize(s);
    // For deep equality on List, we might need to convert both to arrays.
    // Or ensure List has a custom equality check recognized by assert.deepEqual.
    // For now, let's convert to arrays if List is complex.
    // However, the problem description implies List can be used directly with deepEqual
    // if its structure and elements are simple objects.
    // Let's try direct comparison first.
    // The `tokenize` function already returns an inverted (natural order) list.
    // So `expectedTokenObjectsList` should also be in natural order.

    assert.deepEqual([...actualTokens], expectedTokens);
  });
}

function assertTokenizes(input, ...expects) {
  const tokenizer = new Tokenizer(input);
  assert.deepEqual(expects,
    [...tokenizer]);
}

function assertTokenizesNumber(input, expects) {
  assertTokenizes(input,
    { type: 'N', value: expects,
      line: 1, column: 1 });
}

function assertTokenizesSymbol(input, expects) {
  assertTokenizes(input,
    { type: 'Y', value: expects,
      line: 1, column: 1 });
}

