const assert = require("assert");
const Keyword = require("../src/keyword");
const { rootBinding, Bubble} = require("../src/BubbleScript");

describe("rootBinding", function () {

   describe("define", function () {
     it.only("sets a constant", function () {
       const vínculo = {};
       eval(vinculo, "define 🍎 \"apple\"");
       conole.log(vínculo);
     });
   });

   // describe("define", function () {
   //   it.only("sets a constant", function () {
   //     rootBinding.define.call(rootBinding,
   //       Symbol
   //   });
   // });

   describe("get", function () {
     it("gets from object", function () {
       let obj = { name: { first: "Kermit" }};
       assert.equal(rootBinding
         .get.call(rootBinding,
           (Bubble.blow(obj, "name", "first"))),
         "Kermit");
       assert.deepEqual(rootBinding.get
          .call(rootBinding,
                Bubble.blow(obj, "name")),
           { first: "Kermit" });
     });
   });

  describe("send", function () {
    it("sends messages to objects", function () {
      const bubble = Bubble.blow(1, Keyword.for("toString"))
      assert.equal(rootBinding.send(...bubble), "1");
    });

    it("sends messages to objects", function () {
      let meatballsCalled = false;

      const bubble = Bubble.blow(
        {
          meatballs: function () {
            meatballsCalled = true;
          }
        },
        Keyword.for("meatballs")
      );

      assert(!meatballsCalled);
      rootBinding.send(...bubble);
      assert(meatballsCalled);
    });
  });
});
