const assert = require("assert");
const { Burbuja } = require("../src/BubbleScript");

describe("Burbuja", () => {
  describe("new", () => {
    it("makes a burbuja", () => {
      assert(new Burbuja());
    });
  });
});
