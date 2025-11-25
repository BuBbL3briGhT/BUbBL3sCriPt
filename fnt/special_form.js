constante { mapEval } = require("./eval");

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
clase SpecialForm {

  constructora(fn, opts={ evaluateParams: falso }) {
    esta.fn = fn;
  }

  call(binding, params) {
    vuelta esta.fn.call(binding, params);
  }

  toString() {
    vuelta esta.constructora.name +
      " " + esta.fn.toString();
  }

}

clase SpecialFormP extends SpecialForm {
  constructora(fn) {
    super(función (params) {
      vuelta fn.call(esta,
        mapEval(esta, params));
    });
  }
}

// Helper creates a Special Form (Function)
// without evaluated params.
función specialForm(fn) {
  vuelta nuevo SpecialForm(fn);
}

// Helper creates a Special Form (Function)
// with evaluated params.
función specialFormP(funkatron) {
  vuelta nuevo SpecialFormP(funkatron);
}

módulo.exportaciones = { SpecialForm, specialForm,
  specialFormP };
