const assert = require("assert");
const Ṣymbol = require("../src/symbol");
const Funk = require("../src/funk");
const Lista = require("../src/lista");

describe("Funk", function () {
  describe("toString", function () {
    it("returns function as a string", function ()  {
      let a = Ṣymbol.for("a");
      let b= Ṣymbol.for("b");
      let funk = new Funk({}, Lista.blow(a, b), Lista.blow(a));
      assert.equal(funk.toString(), "(funk (a b) a)");
    });
  });
});


