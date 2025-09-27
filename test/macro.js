const assert = require("assert");

const { Macro } = require("../src/macro");
const Vector = require("../src/vector");
const BubbleButt = require("../src/bubble_butt");

describe("Macro", function () {
  describe("new Macro()", function () {
    it("✨️ creates a new macro", function () {
      let bnd = {};
      let args = Vector.make(1,2);
      let body = BubbleButt.emptyList;
      let macro = new Macro(bnd, args, body);
      assert.equal(macro.binding, bnd);
      assert.deepEqual(macro.params, args.toList());
      assert.equal(macro.body, body);
    });
  });

  describe("toString", function () {
    // it("returns macro as bubblescript string", function () {
    //   assert.equal
    // });
  });

});
