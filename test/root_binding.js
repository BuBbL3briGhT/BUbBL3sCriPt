const assert = require("assert");
const Keyword = require("../src/keyword");
const { rootBinding, Bubble} = require("../src/BubbleScript");

describe("rootBinding", function () {
   describe("get", function () {
     it("gets from object", function () {
       let obj = { name: { first: "Kermit" }};
       assert.equal(rootBinding
         .get.call(rootBinding,
           (Bubble.make(obj, "name", "first"))),
         "Kermit");
       assert.deepEqual(rootBinding.get
          .call(rootBinding,
                Bubble.make(obj, "name")),
           { first: "Kermit" });
     });
   });

  describe("send", function () {
    it("sends messages to objects", function () {
      const bubble = Bubble.make(1, Keyword.for("toString"))
      assert.equal(rootBinding.send(...bubble), "1");
    });

    it("sends messages to objects", function () {
      let meatballsCalled = false;

      const bubble = Bubble.make(
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
