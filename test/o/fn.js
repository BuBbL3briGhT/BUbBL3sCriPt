const assert = require("assert");
const Ṣymbol = require("../../src/o/symbol");
const Fn = require("../../src/o/fn");
const List = require("../../src/o/list");

describe("Fn", function () {
  describe("toString", function () {
    it("returns function as a string", function ()  {
      let a = Ṣymbol.for("a");
      let b= Ṣymbol.for("b");
      let fn = new Fn({}, List.make(a, b), List.make(a));
      assert.equal(fn.toString(), "(fn (a b) a)");
    });
  });
});


