
                                        const assert = require("assert");
                                         const sinon = require("sinon");
                                      const { ėval } = require("../src/eval");
                               const { rootBinding } = require("../src/root_binding");
                                          const List = require("../src/list");
                                            const Fn = require("../src/fn");

                                          const zulu = it;

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

    // It creates and sets a function when passed a
    // list as the first parameter, and uses the
    // remainder of the list as the body.
    zulu("Idala futhi isetha umsebenzi lapho "+
         "idlulisa uhlu njengepharamitha yokuqala, "+
         "futhi isebenzisa ingxenye esele yohlu "+
         "njengomzimba."
         , function () {


      const vínculo = Object.create(rootBinding);

         vínculo["💜"] = sinon.fake();

       ėval(vínculo, "definir (🐟) (💜)");

         assert.equal(vínculo["🐟"].constructor, Fn);

       ėval(vínculo, "(🐟)");

         assert.ok(vínculo["💜"].called, "💜 should have been called");

    });


    it.skip("extracts all key values from an ObjectMap in the current binding with *", function () {
      const vínculo = Object.create(rootBinding);
      // TODO: Implement test.
    });



  });
