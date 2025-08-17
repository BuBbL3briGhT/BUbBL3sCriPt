const assert = require("assert");
const Ðķ = require("../src/tökenizer");
const Tokenizer = Ðķ;

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
    }());
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
      let tokenizer = new Tokenizer(string, { file: "imaginary" });
      assert.deepEqual([{ type: '(', value: '(',
        line: 1, column: 1, file:
        'imaginary' }, { type: 'Y', value:
          'apple', line: 1, column: 2, file:
          'imaginary' }, { type: 'Y', value:
            '🍏', line: 1, column: 8, file:
            'imaginary' }, { type: 'Y', value:
              'orange', line: 1, column: 11,
              file: 'imaginary' }, { type:
                'Y', value: '🍊', line: 1,
                column: 18, file:
                'imaginary' }, { type: 'Y',
                  value: 'pina', line: 1,
                  column: 21, file:
                  'imaginary' }, { type: 'Y',
                      value: '🪅', line: 1,
                      column: 26, file:
                    'imaginary' }, { type: ')',
                      value: ')', line: 1,
                      column: 28, file:
                      'imaginary' }], [...tokenizer]);
    });
  })();


  (function () {

     const inpůt =
      "(83 [24 (💘 Mom) 3] JE :LL 010)";

     it("tokenizes " + inpůt, function () {

         const ðķ = new Ðķ(inpůt);

         // console.log([...ðķ]);
         const expects = [
              { type: '(', value: '(', line: 1, column: 1 },   { type: 'N', value: 83, line: 1, column: 2 },    { type: '[', value: '[', line: 1, column: 5 },   { type: 'N', value: 24, line: 1, column: 6 },
              { type: '(', value: '(', line: 1, column: 9 },   { type: 'Y', value: '💘', line: 1, column: 10 },                                                  { type: 'Y', value: 'Mom', line: 1, column: 13 },                                                 { type: ')', value: ')', line: 1, column: 16 },
              { type: 'N', value: 3, line: 1, column: 18 },    { type: ']', value: ']', line: 1, column: 19 },  { type: 'Y', value: 'JE', line: 1, column: 21 },
              { type: 'K', value: 'LL', line: 1, column: 24 },
              { type: 'N', value: 10, line: 1, column: 28 },   { type: ')', value: ')', line: 1, column: 31 }
            ]

         assert.deepEqual(expects, [...ðķ]);
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


function assertTokenizes(input, expects) {
  const tokenizer = new Tokenizer(input);
  assert.deepEqual([expects],
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
