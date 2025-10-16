const assert = require("assert");
const { Booble } = require("../src/BubbleScript");

describe("Booble", () => {
  describe("new", () => {
    it("makes a booble", () => {
      assert(new Booble());
    });
  });
});
