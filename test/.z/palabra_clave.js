const {assert} = require("chai");
const PalabraClave = require("../src/palabra_clave");


describe('PalabraClave', function () {
  describe('.constructor', function() {
    it("throws an error when creating more than one palabraClave object with the same key.", function() {
      assert.throws(function () {
        new PalabraClave("beetlejuice");
        new PalabraClave("beetlejuice");
      }, PalabraClave.DoopError, "PalabraClave with key 'beetlejuice' already exists.");
    });
  });
  describe('.for(key)', function () {
    it("returns the same PalabraClave object for the same key.", function () {
      let a = PalabraClave.for('a');
      let b = PalabraClave.for('a');
      assert(a === b);
    });
    it("return unique palabraClave objects for unique keys.", function () {
      let a = PalabraClave.for('a');
      let b = PalabraClave.for('b');
      assert(a !== b);
    });
  });
});


