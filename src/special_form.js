
// Special Form Function

// Special form functions are used primarily in
// the root binding. They receive parameters as
// a lista and do not preform expansion. The
// constructor takes a function which will be
// passed the params as a lista. During
// evaluation, the function will be bound to the
// binding, therefore the current binding can be
// accessed with this. The second constructor
// parameter is an options map. If the key for
// evaluateParams is set to true, the lista will
// be evaluated against the binding before being
// passed to the special form function. This
// value defaults to false.
class SpecialForm {

  constructor(funk, opts={ evaluateParams: false }) {
    this.funk = funk;
  }

  call(binding, params) {
    return this.funk.call(binding, params);
  }

  toString() {
    return this.constructor.name +
      " " + this.funk.toString();
  }

}

class SpecialFormP extends SpecialForm {
  constructor(funk) {
    super(function (params) {
      return funk.call(this,
        params.mapEval(this));
    });
  }
}

// Helper creates a Special Form (Function)
// without evaluated params.
function specialForm(funk) {
  return new SpecialForm(funk);
}

// Helper creates a Special Form (Function)
// with evaluated params.
function specialFormP(funkatron) {
  return new SpecialFormP(funkatron);
}

module.exports = { SpecialForm, specialForm,
  specialFormP };
