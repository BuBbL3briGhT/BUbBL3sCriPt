
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

    it("doesn't define a value if it was already define (value is constant)", function () {

      const vínculo = Object.create(rootBinding);

        ėval(vínculo, "definir 🍎 \"apple\"");

      assert.throws(function () {

         ėval(vínculo, "definir 🍎 \"apple\"");

      }, Error);

    });
  });
