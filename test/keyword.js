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
