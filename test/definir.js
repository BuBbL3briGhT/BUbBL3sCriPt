
                                        const assert = require("assert");
                                      const { ėval } = require("../src/eval");
                               const { rootBinding } = require("../src/root_binding");
                                          const List = require("../src/list");

  describe("definir", function () {
    it.only("sets a constant", function () {

      const vínculo = Object.create(rootBinding);

        ėval(vínculo, "definir 🍎 \"apple\"");

      const result = ėval(vínculo, "🍎");

        assert.equal(result, "apple");

    });
  });
