
// Special Form Function

// Special form functions are used primarily in
// the root binding. They receive parameters as
// a list and do not preform expansion. The
// constructor takes a function which will be
// passed the params as a list. During
// evaluation, the function will be bound to the
// binding, therefore the current binding can be
// accessed with this. The second constructor
// parameter is an options map. If the key for
// evaluateParams is set to true, the list will
// be evaluated against the binding before being
// passed to the special form function. This
// value defaults to false.
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

// Helper creates a Special Form (Function)
// without evaluated params.
function specialForm(fn) {
  return new SpecialFormFn(fn);
}

// Helper creates a Special Form (Function)
// with evaluated params.
function specialFormP(fn) {
  return new SpecialForm(fn,
    { evaluteParams: true });
}

module.exports = { SpecialForm, specialForm,
  specialFormP };
