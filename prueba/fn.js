import assert from "node:assert";
import { it, describe } from "node:test";
import Fn from "../src/fn.js"
import { List } from "../src/list.js";
import Ṣymbol from "../src/symbol.js";

describe("Fn", function () {
  describe("toString", function () {
    it("returns function as a string", function ()  {
      const a = Ṣymbol.for("a");
      const b = Ṣymbol.for("b");
      const fn = new Fn({}, List.make(a, b),
        List.make(a));
      assert.equal(fn.toString(), "((fn a b) a)");
    });
  });
});


