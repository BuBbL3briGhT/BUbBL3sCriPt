
                                        const assert = require("assert");
                                      const { ėval } = require("../src/eval");
                               const { rootBinding } = require("../src/root_binding");
                                          const List = require("../src/list");

  // Describe define.
  describe("definir", function () {

    // It sets a value.
    it("establece un valor", function () {

      const vínculo = Object.create(rootBinding);

        assert.equal(ėval(vínculo, "🍎"), undefined);

      ėval(vínculo, "definir 🍎 \"apple\"");

        const result = ėval(vínculo, "🍎");

      assert.equal(result, "apple");

    });

    // It doesn't define a value if it was already
    // defined (value is constant).
    it("no define un valor si ya estaba definido "+
       "(el valor es constante)", function () {

      const vínculo = Object.create(rootBinding);

        ėval(vínculo, "definir 🍎 \"apple\"");

      assert.throws(function () {

         ėval(vínculo, "definir 🍎 \"apple\"");

      }, Error);

    });
  });
