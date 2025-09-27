const assert = require("assert");
const Keyword = require("../src/keyword");
const { rootBinding, BubbleButt} = require("../src/BubbleScript");

describe("rootBinding", function () {
   describe("get", function () {
     it("gets from object", function () {
       let obj = { name: { first: "Kermit" }};
       assert.equal(rootBinding
         .get.call(rootBinding,
           (BubbleButt.make(obj, "name", "first"))),
         "Kermit");
       assert.deepEqual(rootBinding.get
          .call(rootBinding,
                BubbleButt.make(obj, "name")),
           { first: "Kermit" });
     });
   });

  describe("send", function () {
    it("sends messages to objects", function () {
      const bubbleButt = BubbleButt.make(1, Keyword.for("toString"))
      assert.equal(rootBinding.send(...bubbleButt), "1");
    });

    it("sends messages to objects", function () {
      let meatballsCalled = false;

      const bubbleButt = BubbleButt.make(
        {
          meatballs: function () {
            meatballsCalled = true;
          }
        },
        Keyword.for("meatballs")
      );

      assert(!meatballsCalled);
      rootBinding.send(...bubbleButt);
      assert(meatballsCalled);
    });
  });
});
