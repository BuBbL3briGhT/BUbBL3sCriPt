// Util function namspace which contians
// common and helpful utility methods used
// through the project.
class Util {

  // Returns an array of static method
  // names, as strings, from the passed in
  // 'klass' object.
  static getStaticMethods(klass) {
    return  Object.
      getOwnPropertyNames(klass).
      filter(
        (prop) =>
        typeof klass[prop] ===
        'function' &&
        !Object.
          prototype.
          hasOwnProperty.
          call(klass.prototype, prop)
    );
  }

  static makeRootBinding(Base, _eval) {
    const rootBinding = Object.create();
    Util.getStaticMethods(base);

    console.log(rootBinding);
  }

  // Makes a Bubblescript function from a
  // Javascript function.
  // Params:
  //   q: A Javascript function that will be
  //   called for this function.
  // Returns an annonomous function that is
  // sutible for use with bubblescript.
  // #coreUtilityFunction
  // TODO: Create tests for mkfn.
  static makeFunction(fn, _eval, binding) {
    return (params) => {
      return fn.call(binding,
        params.map(p => _eval(binding, p)))
    }
  }

}

module.exports = Util;
