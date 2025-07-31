const assert = require("assert");

const { Macro, Vector, List } =
  require("../../src/BubbleScript");

describe("Macro", function () {
  describe("new Macro()", function () {
    it("✨️ creates a new macro", function () {
      let bnd = {};
      let args = Vector.make(1,2);
      let body = List.emptyList;
      let macro = new Macro(bnd, args, body);
      assert.equal(macro.bnd, bnd);
      assert.deepEqual(macro.args, args.toList());
      assert.equal(macro.body, body);
    });
  });

  describe("toString", function () {
    // it("returns macro as bubblescript string", function () {
    //   assert.equal
    // });
  });

});
