import assert from "node:assert";
import { it, describe } from "node:test";
import Bubble from "../src/bubble.js";

describe("Bubble", () => {
  describe("new", () => {
    it("makes a bubble", () => {
      assert(new Bubble());
    });
  });
});
