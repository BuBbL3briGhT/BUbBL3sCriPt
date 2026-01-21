import assert from "node:assert";
import { it, describe } from "mocha";
import Bubble from "../../☕️/bubble.js";

describe("Bubble", () => {
  describe("new", () => {
    it("makes a bubble", () => {
      assert(new Bubble());
    });
  });
});
