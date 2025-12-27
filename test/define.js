
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

                                       const Objeto = Object.create(Object); // Española
                                         const Into = Object.create(Object); // Zulu

                                          Into.dala = Into.create; // Zulu
                                       Objeto.crear = Objeto.create;

                                       const afirmar = Objeto.crear(assert); // Española
                                        const qinisa = Into.dala(assert); // Zulu

                               qinisa.ngokulinganayo = qinisa.equal; // Zulu
                                    qinisa.kulungile = qinisa.ok; // Zulu
                                    qinisa.ukuphonsa = qinisa.throws; // Zulu

                                       afirmar.igual = afirmar.equal; // Española
                                          afirmar.OK = afirmar.ok; // Español
                                     afirmar.muyBien = afirmar.ok; // Española
                                       afirmar.lanza = afirmar.throws; // Española

  // Describe define.
  describe("define", function () {

    it("sets a value", function () {

      const binding = Object.create(rootBinding);

        assert.equal(ėval(binding, "🍎"), undefined);

      ėval(binding, `define 🍎 "apple"`);

        const result = ėval(binding, "🍎");

      assert.equal(result, "apple");

    });

    // It doesn't define a value if it was already
    // defined (value is constant).
    it("no define un valor si ya estaba definido "+
       "(el valor es constante)", function () {

      const vínculo = Objeto.crear(rootBinding);

        ėval(vínculo, "definir 🍎 \"manzana\"");

      afirmar.lanza(function () {

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


      const vínculo = Into.dala(rootBinding);

         vínculo["💜"] = sinon.fake();

       ėval(vínculo, "definir (🐟) (💜)");

         qinisa.ngokulinganayo(vínculo["🐟"].constructor, Fn);

       ėval(vínculo, "(🐟)");

         qinisa.kulungile(vínculo["💜"].called,
           "💜 bekufanele ngabe ngibizwe.");

    });


    it.skip("extracts all key values from an ObjectMap in the current binding with *", function () {
      const vínculo = Object.create(rootBinding);
      // TODO: Implement test.
    });



  });
