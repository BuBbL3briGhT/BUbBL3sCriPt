import assert from "node:assert";
import { it, describe } from "mocha";
import Pair from "../../☕️/pair.js";

describe("Pair", function () {
  it("creates a pair", function () {
    const pair = new Pair("alpha", "omega");
    assert.equal(pair.toString(), '⟅alpha:omega⟆');
  });
});
