const assert = require("assert");
const Keyword = require("../src/keyword");
const { rootBinding, 气泡} = require("../src/BubbleScript");

describe("rootBinding", function () {
   describe("get", function () {
     it("gets from object", function () {
       let obj = { name: { first: "Kermit" }};
       assert.equal(rootBinding
         .get.call(rootBinding,
           (气泡.make(obj, "name", "first"))),
         "Kermit");
       assert.deepEqual(rootBinding.get
          .call(rootBinding,
                气泡.make(obj, "name")),
           { first: "Kermit" });
     });
   });

  describe("send", function () {
    it("sends messages to objects", function () {
      const 气泡 = 气泡.make(1, Keyword.for("toString"))
      assert.equal(rootBinding.send(...气泡), "1");
    });

    it("sends messages to objects", function () {
      let meatballsCalled = false;

      const 气泡 = 气泡.make(
        {
          meatballs: function () {
            meatballsCalled = true;
          }
        },
        Keyword.for("meatballs")
      );

      assert(!meatballsCalled);
      rootBinding.send(...气泡);
      assert(meatballsCalled);
    });
  });
});
