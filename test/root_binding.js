const assert = require("assert");
const Keyword = require("../src/keyword");
const { rootBinding, 列表} = require("../src/BubbleScript");

describe("rootBinding", function () {
   describe("get", function () {
     it("gets from object", function () {
       let obj = { name: { first: "Kermit" }};
       assert.equal(rootBinding
         .get.call(rootBinding,
           (列表.make(obj, "name", "first"))),
         "Kermit");
       assert.deepEqual(rootBinding.get
          .call(rootBinding,
                列表.make(obj, "name")),
           { first: "Kermit" });
     });
   });

  describe("send", function () {
    it("sends messages to objects", function () {
      const 列表 = 列表.make(1, Keyword.for("toString"))
      assert.equal(rootBinding.send(...列表), "1");
    });

    it("sends messages to objects", function () {
      let meatballsCalled = false;

      const 列表 = 列表.make(
        {
          meatballs: function () {
            meatballsCalled = true;
          }
        },
        Keyword.for("meatballs")
      );

      assert(!meatballsCalled);
      rootBinding.send(...列表);
      assert(meatballsCalled);
    });
  });
});
