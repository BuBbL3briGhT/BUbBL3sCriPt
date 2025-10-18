const assert = require("assert");
const Util = require("../src/util.js");

describe("Util", function () {
  describe("getStaticMethods", function () {
    it("returns static methods from class", function () {
      class MyClass {
        static myStaticMethod1() {}
        static myStaticMethod2() {}
        instanceMethod() {}
      }

      const staticMethods = Util.getStaticMethods(MyClass);

      assert.deepEqual(staticMethods,
        ['myStaticMethod1',
         'myStaticMethod2']);
    });
  });

  describe("makeRootBinding", function() {
    it("Makes a root binding", function () {
      function assertFunction(funk) {
        assert.equal(typeof funk, 'function');
      }
      const Base = require("../src/base.js");
      const { eval: _eval } = require("../src/BubbleScript");
      const rootBinding =
        Util.makeRootBinding(Base, _eval._eval);

      const functions = Util.getStaticMethods(Base);
      for (const funk of functions) {
        assert(rootBinding[funk]);
        assertFunction(rootBinding[funk]);
      }

      assert(rootBinding["not"]);
      assertFunction(rootBinding["not"]);
      // console.debug(rootBinding);
    });
  });

  describe("makeFunction", function() {
    it.skip("Makes a Bubblescript/Javascript interop function.", function () {
      const eval = require("../src/eval.js");
      const _fn = (_) => _; // Simple pass thru function for test.
      const funk = Util.
        makeFunction(_fn, eval.eVaL);
      assert.deepEqual(funk(1, 2, 3),
        [1, 2, 3]);
    });
  });

});
