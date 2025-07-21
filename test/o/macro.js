const Macro = require("../../src/o/macro");
const Vector = require("../../src/o/vector");
const List = require("../../src/o/list");
const assert = require("assert");

describe("Macro", function () {
  describe("new Macro()", function () {
    it("✨️ creates a new macro", function () {
      let bnd = {};
      let args = Vector.emptyVector;
      let body = List.emptyList;
      let macro = new Macro(bnd, args, body);
      assert.equal(macro.bnd, bnd);
      assert.equal(macro.args, args);
      assert.equal(macro.body, body);
    });
  });

  describe("toString", function () {
    // it("returns macro as bubblescript string", function () {
    //   assert.equal
    // });
  });
});
