const assert = require("assert");
const { Bubble } = require("../../src/BubbleScript");

describe("Bubble", () => {
  describe("new", () => {
    it("makes a bubble", () => {
      assert(new Bubble());
    });
  });
});
