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
    const functions = Util.getStaticMethods(base);
    consol.log(functions);
    // make interop functions
    // copy interop functions to root
    // binding.

    // ? Certian functions from the original
    // rootBinding object don't appear to
    // use mkfn for definition, but still
    // work e.g. muf (have passing test).
    // Need further investigation to
    // determine why this is and how best to
    // represent the distinction if
    // neccessary.
    //
    // possible answer: It appears mkfn
    // simply handles processing the params
    // prior to invoking the js function and
    // passing the params in so it is
    // probably a bug in the original code
    // and the tests just aren't catching
    // it. All functions on base should have
    // the expectation that the parameters
    // are processed before calling.
    //
    // As an aside, this is where the
    // programming model will need to
    // improve in the future. Processing
    // ideally happens in a lazy way,
    // needing to process every parameter,
    // or any parameter, prior to passing
    // the context thread to the invoked
    // function will greatly hinder the
    // applications proformance, especially
    // at scale. It would be premature to
    // consider tackling this likly future
    // issue now, but just noting that lazy
    // evaluation is an enventual project
    // goal and it will likly have an effect
    // on what we are assuming here. In all
    // liklyhood the solution for this will
    // develop naturally overtime, and be
    // available when needed. Other
    // languages have already achevied such
    // fluidity in their programming models
    // and implementions, so it is certianly
    // at least theroretically possible.
    // Long live Bubblescript! 🐇

    // console.log(rootBinding);
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
