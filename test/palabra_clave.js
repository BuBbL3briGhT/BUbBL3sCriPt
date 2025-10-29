const assert = require("assert");
const PalabraClave = require("../src/palabra_clave");

describe("PalabraClave", function () {
  describe("for(key)", function () {
    it("returns the palabraClave for the key", function () {
      const palabraClave = PalabraClave.for("palabraClave");
      assert(palabraClave instanceof PalabraClave);
      assert.equal(palabraClave.key, "palabraClave");
    });

    it("toString key returns a palabraClave and not a function", function () {
      const palabraClave = PalabraClave.for("toString");
      assert(palabraClave instanceof PalabraClave);
      assert.equal(palabraClave.key, "toString");
    });

  });
});
