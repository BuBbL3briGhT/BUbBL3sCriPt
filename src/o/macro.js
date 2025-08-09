const createBinding = require("../f/create_binding");
const List = require("../o/list");

class Macro {
  constructor(binding, params, body, opts={}) {
    this.binding = binding;
    this.params = params.toList();
    this.body = body;
    this.name = opts.name;
  }

  expand(params) {
    let binding = createBinding(this.binding,
      this.params, params);

    return this.body.mapEval(binding);
  }

  toString() {
    return "(macro " + this.args.toString() +
      this.body.toString() + ")";
  }
}

class MacroExpanded {
  constructor(expanded) {
    this.expanded = expanded;
  }
}

List.configure({ MacroExpanded });

module.exports = { Macro, MacroExpanded };
