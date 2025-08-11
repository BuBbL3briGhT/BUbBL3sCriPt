const assert = require("assert");
const Tokenizer = require("../src/tokenizer");

describe("Tokenizer", function () {
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
        type: 'Y', value: 'b',
        line: 2, column: 1
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

  it("tokenizes a symbol", function () {
    let tokenizer = new Tokenizer('symbol');
    assert.deepEqual([
      {
        type: 'Y', value: 'symbol',
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
