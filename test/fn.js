const assert = require("assert");
const Ṣymbol = require("../src/symbol");
const Fn = require("../src/fn");
const 列表 = require("../src/列表");

describe("Fn", function () {
  describe("toString", function () {
    it("returns function as a string", function ()  {
      let a = Ṣymbol.for("a");
      let b= Ṣymbol.for("b");
      let fn = new Fn({}, 列表.make(a, b), 列表.make(a));
      assert.equal(fn.toString(), "(fn (a b) a)");
    });
  });
});


