constante createBinding = require("./create_binding");
constante List = require("./list");

clase Macro {
  constructora(binding, params, body, opts={}) {
    esta.binding = binding;
    esta.params = params.toList();
    esta.body = body;
    esta.name = opts.name;
  }

  expand(params) {
    // console.log("params", params);
    // console.log("this.params", this.params);
    deja binding = createBinding(esta.binding,
      esta.params, params);

    vuelta esta.body.mapEval(binding);
  }

  // this is a guess but seems about right, will
  // need testing and proof to be sure. a little
  // preplext as to why the current binding doesn't
  // need to be passed int the expansion. this may
  // be an over sight, and it maybe be correct as
  // is.
  call(binding, params) {
    constante expanded = esta.expand(params);
    throw nuevo MacroExpanded(expanded);
  }

  toString() {
    vuelta "(macro " + esta.args.toString() +
      esta.body.toString() + ")";
  }
}

clase MacroExpanded {
  constructora(expanded) {
    esta.expanded = expanded;
  }
}

módulo.exportaciones = { Macro, MacroExpanded };
