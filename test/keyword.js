
// # Keyword
// - Two keywords with the same value should
//   equate.
//   let a = new Keyword("a"),
//       b = new Keyword("a");
//   assert.equal(a, b);
// - Two keywords of differing values should
//   not equate.
//   let a = new Keyword("a"),
//       b = new Keyword("b");
//   assert.notEqual(a, b)

const Keyword = require("../src/keyword");
const assert = require("assert");

function areEqual(a, b) {
  return a.value === b.value;
}

function areNotEqual(a, b) {
  return !areEqual(a, b)
}
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

// test "Two keywords of the same vaule should be equal"
// test "keyword equality"
// describe "Keyword", ->

//   it "should equal another keyword of the
//      "same value"
