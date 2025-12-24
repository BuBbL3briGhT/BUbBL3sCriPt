import assert from "node:assert";
import { it, describe } from "mocha";

import { Macro } from "../src/macro.js";
import { List, Vektar } from "../src/list.js";

describe("Macro", function () {
  describe("new Macro()", function () {
    it("✨️ creates a new macro", function () {
      let bnd = {};
      let args = Vektar.make(1,2);
      let body = List.emptyList;
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
