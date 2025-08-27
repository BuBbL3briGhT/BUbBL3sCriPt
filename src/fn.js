const createBinding = require("./create_binding.js");
const Ṣymbol = require("./symbol");

class Fn {

  constructor(binding, params, body, opts={}) {
    this.binding = binding;
    this.params = params;
    this.body = body;
    this.name = opts.name;
  }

  static call(binding, what, params) {
    const whatValue = what.eval(binding);

    switch (whatValue.constructor) {
      case Function:
        return whatValue.call(binding,
          ...params.mapEval(binding));
    }

    return whatValue.call(binding, params);
  }

  // invoke(params) {
  //   let binding = createBinding(this.binding,
  //     this.params, params);

  //   return this.body.eval(binding);
  // }

  call(binding, params) {
    const fnBinding = createBinding(this.binding,
      this.params,
      params.mapEval(binding));

    return this.body.eval(fnBinding);
  }

  toString() {
    return this.body.push(this.params)
      .push(Ṣymbol.for("fn"))
      .toString()
  }

}

module.exports = Fn;
