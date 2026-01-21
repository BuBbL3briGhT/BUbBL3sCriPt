import assert from "node:assert";
import { it, describe } from "mocha";
import Keyword from "../../☕️/keyword.js";

describe("Keyword", function () {
  describe("for(key)", function () {
    it("returns the keyword for the key", function () {
      const keyword = Keyword.for("keyword");
      assert(keyword instanceof Keyword);
      assert.equal(keyword.key, "keyword");
    });

    it("toString key returns a keyword and not a function", function () {
      const keyword = Keyword.for("toString");
      assert(keyword instanceof Keyword);
      assert.equal(keyword.key, "toString");
    });

  });
});
