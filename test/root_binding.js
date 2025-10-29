const assert = require("assert");
const PalabraClave = require("../src/palabra_clave");
const { rootBinding, Lista} = require("../src/BubbleScript");

describe("rootBinding", function () {
   describe("get", function () {
     it("gets from object", function () {
       let obj = { name: { first: "Kermit" }};
       assert.equal(rootBinding
         .get.call(rootBinding,
           (Lista.blow(obj, "name", "first"))),
         "Kermit");
       assert.deepEqual(rootBinding.get
          .call(rootBinding,
                Lista.blow(obj, "name")),
           { first: "Kermit" });
     });
   });

  describe("send", function () {
    it("sends messages to objects", function () {
      const lista = Lista.blow(1, PalabraClave.for("toString"))
      assert.equal(rootBinding.send(...lista), "1");
    });

    it("sends messages to objects", function () {
      let meatballsCalled = false;

      const lista = Lista.blow(
        {
          meatballs: function () {
            meatballsCalled = true;
          }
        },
        PalabraClave.for("meatballs")
      );

      assert(!meatballsCalled);
      rootBinding.send(...lista);
      assert(meatballsCalled);
    });
  });
});
