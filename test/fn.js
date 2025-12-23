const assert = require("assert");
const Fn = require("../src/fn");
const { List } = require("../src/list");
const Ṣymbol = require("../src/symbol");

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


