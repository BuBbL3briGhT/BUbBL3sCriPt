const assert = require("assert");
const Keyword = require("../src/keyword");

const {areEqual, areNotEqual} = Keyword;

const suite = describe,
      test = specify;

suite("Keyword", function() {
  test("Two keywords with the same value should equate.", function() {
    let a = new Keyword("a"),
        b = new Keyword("a");
    assert(areEqual(a, b));
  });

  test("Two keywords of differing values should not equate.", function() {
    let a = new Keyword("a"),
        b = new Keyword("b");
    assert(areNotEqual(a, b));
  });
});

describe('Keyword', function () {
  describe('.for(key)', function () {
    it("returns the same Keyword object for the same key.", function () {
      let a = Keyword.for('a');
      let b = Keyword.for('a');
      assert(a === b);
    });
  });
});


