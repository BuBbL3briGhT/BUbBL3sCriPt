// const assert = require("assert");
const {assert} = require("chai");
const Keyword = require("../src/keyword");

// const {areEqual, areNotEqual} = Keyword;

// const suite = describe,
//       test = specify;

// suite("Keyword", function() {
  // test("Two keywords with the same value should equate.", function() {
  //   let a = new Keyword("a"),
  //       b = new Keyword("a");
  //   assert(areEqual(a, b));
  // });

  // test("Two keywords of differing values should not equate.", function() {
  //   let a = new Keyword("a"),
  //       b = new Keyword("b");
  //   assert(areNotEqual(a, b));
  // });
// });

describe('Keyword', function () {
  // it("gaurds against direct instantiation", function() {
  //   assert.throws(function() {
  //     new Keyword("macaroni");
  //   }, Error);
  // });
  describe('.constructor', function() {
    it("throws an error when creating more than one keyword object with the same key.", function() {
      assert.throws(function () {
        new Keyword("beetlejuice");
        new Keyword("beetlejuice");
      }, Keyword.DoopError, "Keyword with key 'beetlejuice' already exists.");
    });
  });
  describe('.for(key)', function () {
    it("returns the same Keyword object for the same key.", function () {
      let a = Keyword.for('a');
      let b = Keyword.for('a');
      assert(a === b);
    });
    it("return unique keyword objects for unique keys.", function () {
      let a = Keyword.for('a');
      let b = Keyword.for('b');
      assert(a !== b);
    });
  });
});


