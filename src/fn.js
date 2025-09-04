const createBinding = require("./create_binding.js");
const Ṣymbol = require("./symbol");

class Fn {
  constructor(binding, params, body, opts={}) {
    this.binding = binding;
    this.params = params;
    this.body = body;
    this.name = opts.name;
  }

  static call(binding, fn, params) {
    switch (fn.constructor) {
      case Function:
        return fn.call(binding,
          ...params.mapEval(binding));
    }

    return fn.call(binding, params);
  }

  // invoke(params) {
  //   let binding = createBinding(this.binding,
  //     this.params, params);

  //   return this.body.eval(binding);
  // }

  call(binding, params) {
    try {
      const fnBinding = createBinding(this.binding,
        this.params,
        params.mapEval(binding));

      return this.body.evalEach(fnBinding);
    } catch (error) {
      error.stack += this.trace;
      throw error;
    }
  }

  get trace () {
    const { name, file, line, column } = this;
    return ` ${name} at ${file}:${line}:${column}`;
  }

  toString() {
    return this.body.push(this.params)
      .push(Ṣymbol.for("fn"))
      .toString()
  }

}

module.exports = Fn;
