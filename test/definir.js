
                                        const assert = require("assert");
                                      const { ėval } = require("../src/eval");
                               const { rootBinding } = require("../src/root_binding");
                                          const List = require("../src/list");

  describe("definir", function () {
    it("sets a value", function () {

      const vínculo = Object.create(rootBinding);

        assert.equal(ėval(vínculo, "🍎"), undefined);

      ėval(vínculo, "definir 🍎 \"apple\"");

        const result = ėval(vínculo, "🍎");

      assert.equal(result, "apple");

    });

    it("defines a constant");
    it("does not set a new vaule if on is already set for that key at the current context (binding)");
  });
