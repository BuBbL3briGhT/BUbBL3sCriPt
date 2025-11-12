
                                        const assert = require("assert");
                                         const sinon = require("sinon");
                                      const { ėval } = require("../src/eval");
                               const { rootBinding } = require("../src/root_binding");
                                          const List = require("../src/list");
                                            const Fn = require("../src/fn");

                                          const yona = it; // Zulu
                                          const ella = it; // Española

                                     const describir = describe; // Española
                                         const chaza = describe; // Española

                                       const afirmar = assert; // Española
                                        const qinisa = assert; // Zulu

  // Describe define.
  describir("definir", function () {

    // It sets a value.
    ella("establece un valor", function () {

      const vínculo = Object.create(rootBinding);

        afirmar.equal(ėval(vínculo, "🍎"), undefined);

      ėval(vínculo, "definir 🍎 \"manzana\"");

        const resultado = ėval(vínculo, "🍎");

      afirmar.equal(resultado, "manzana");

    });

    // It doesn't define a value if it was already
    // defined (value is constant).
    ella("no define un valor si ya estaba definido "+
       "(el valor es constante)", function () {

      const vínculo = Object.create(rootBinding);

        ėval(vínculo, "definir 🍎 \"manzana\"");

      afirmar.throws(function () {

         ėval(vínculo, "definir 🍎 \"manzana\"");

      }, Error);

    });

    // It creates and sets a function when passed a
    // list as the first parameter, and uses the
    // remainder of the list as the body.
    yona("Idala futhi isetha umsebenzi lapho "+
         "idlulisa uhlu njengepharamitha yokuqala, "+
         "futhi isebenzisa ingxenye esele yohlu "+
         "njengomzimba."
         , function () {


      const vínculo = Object.create(rootBinding);

         vínculo["💜"] = sinon.fake();

       ėval(vínculo, "definir (🐟) (💜)");

         qinisa.equal(vínculo["🐟"].constructor, Fn);

       ėval(vínculo, "(🐟)");

         qinisa.ok(vínculo["💜"].called, "💜 should have been called");

    });


    it.skip("extracts all key values from an ObjectMap in the current binding with *", function () {
      const vínculo = Object.create(rootBinding);
      // TODO: Implement test.
    });



  });
