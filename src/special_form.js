

// CoreFunction is a wrapper for a JavaScript
// function, but is handeled differently by the
// evaluator, primary does not preform the
// interop of spreading the list params or
// evaluating the paramer list. This matches how
// Macros and Fn is called to maintain a
// consistant interface.
class SpecialForm {

  constructor(fn, opts={ evaluateParams: false }) {
    if (opts.evaluateParams) {
      this.fn = function (params) {
        return fn.call(this,
          params.mapEval(this));
      }
    } else {
      this.fn = fn;
    }
  }

  call(binding, params) {
    this.fn.call(binding, params);
  }

}

module.exports = SpecialForm;
