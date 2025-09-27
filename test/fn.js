const assert = require("assert");
const Ṣymbol = require("../src/symbol");
const Fn = require("../src/fn");
const Bubble = require("../src/bubble");

describe("Fn", function () {
  describe("toString", function () {
    it("returns function as a string", function ()  {
      let a = Ṣymbol.for("a");
      let b= Ṣymbol.for("b");
      let fn = new Fn({}, Bubble.make(a, b), Bubble.make(a));
      assert.equal(fn.toString(), "(fn (a b) a)");
    });
  });
});


