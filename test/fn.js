const assert = require("assert");
const Ṣymbol = require("../../src/symbol");
const Fn = require("../../src/fn");
const List = require("../../src/list");

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


