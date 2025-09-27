const assert = require("assert");
const Ṣymbol = require("../src/symbol");
const Fn = require("../src/fn");
const BubbleButt = require("../src/bubble_butt");

describe("Fn", function () {
  describe("toString", function () {
    it("returns function as a string", function ()  {
      let a = Ṣymbol.for("a");
      let b= Ṣymbol.for("b");
      let fn = new Fn({}, BubbleButt.make(a, b), BubbleButt.make(a));
      assert.equal(fn.toString(), "(fn (a b) a)");
    });
  });
});


