const assert = require("assert");
const Ðķ = require("../src/tökenizer");
const Tokenizer = Ðķ;

describe("Tokenizer", function () {

  it.only("tokenizes the number 1", function () {
    const tokenizer = new Tokenizer("1");
    assert.deepEqual([
      { type: 'N', value: 1,
        line: 1, column: 1 }
    ], [...tokenizer]);
  });

  it.only("tokenizes the number 12", function () {
    const tokenizer = new Tokenizer("12");
    assert.deepEqual([
      { type: 'N', value: 12,
        line: 1, column: 1 }
    ], [...tokenizer]);
  });

  it.only("tokenizes numbers", function () {
    function assertTokenizes(value, expects) {
      const tokenizer = new Tokenizer(value);
      assert.deepEqual([
        { type: 'N', value: expects,
          line: 1, column: 1 }
      ], [...tokenizer]);
    }

    assertTokenizes("0", 0);
    assertTokenizes("1", 1);
    assertTokenizes("2", 2);
    assertTokenizes("3", 3);
    assertTokenizes("4", 4);
    assertTokenizes("5", 5);
    assertTokenizes("6", 6);
    assertTokenizes("7", 7);
    assertTokenizes("8", 8);
    assertTokenizes("9", 9);
    assertTokenizes("1234567890", 1234567890);
    assertTokenizes("0123456789", 123456789);

    // Deciminals
    assertTokenizes("0.1", 0.1);
    assertTokenizes("1.1", 1.1);
    assertTokenizes("22.22", 22.22);
    assertTokenizes("333.333", 333.333);
  });

  it.only("tokenizes a symbol", function () {
    let tokenizer = new Tokenizer('symbol');
    assert.deepEqual([
      {
        type: 'Y', value: 'symbol',
        line: 1, column: 1
      }
    ], [...tokenizer]);
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
