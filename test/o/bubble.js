const assert = require("assert");
const Bubble = require("../../src/o/bubble");

describe("Bubble", () => {
  describe("new", () => {
    it("makes a bubble", () => {
      assert(new Bubble());
    });
  });
});
