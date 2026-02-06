import { mapEval } from './eval.js';

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
export class SpecialForm {
  constructor(fn, opts = { evaluateParams: false }) {
    this.fn = fn;
  }

  call(binding, params) {
    return this.fn.call(binding, params);
  }

  toString() {
    return this.constructor.name + ' ' + this.fn.toString();
  }
}

export class SpecialFormP extends SpecialForm {
  constructor(fn) {
    super(function (params) {
      return fn.call(this, mapEval(this, params));
    });
  }
}

// Helper creates a Special Form (Function)
// without evaluated params.
export function specialForm(fn) {
  return new SpecialForm(fn);
}

// Helper creates a Special Form (Function)
// with evaluated params.
export function specialFormP(funkatron) {
  return new SpecialFormP(funkatron);
}
