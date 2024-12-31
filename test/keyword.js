const {assert} = require("chai");
const Keyword = require("../src/keyword");


describe('Keyword', function () {
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


