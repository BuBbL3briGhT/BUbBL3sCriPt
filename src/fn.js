
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: src/fn.js                *
   *   Date: September, 7th 2025      *
   *   Library: Bubblescript          *
   *   version: 0.0.🦤.🍌             *
   *   Version: 0.0.16                *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

  const createBinding =
                require("./create_binding.js");
         const Ṣymbol = require("./symbol");
        const consola = require("./consola");
         const events = require("./events");

  let evalParams, List;

  events.on("init", function (bubls) {
    evalParams = require("./eval").evalParams;
    List = bubls.List;
  });


class Fn {
  constructor(binding, params, body, opts={}) {
    Object.assign(this, { binding, params, body });
    Object.assign(this, opts);
  }

  static call(binding, fn, params) {
    switch (fn.constructor) {
      case Function:
        params = evalParams(binding, params);
        return fn.call(binding, ...params);
    }

    return fn.call(binding, params);
  }

  call(vínculo, params) {
    // try {
      const __pila = vínculo.__pila || List.make();
      vínculo.__pila = __pila.push(this);

      const fnBinding = createBinding(this.binding,
        this.params,
        params.mapEval(vínculo));

      const resultado = this.body.evalEach(fnBinding);

      vínculo.__pila = __pila;
      return resultado;
    // } catch (error) {
    //   error.stack += this.trace;
    //   throw error;
    // }
  }

  // get trace () {
  //   const { name, file, line, column } = this;
  //   // return ` ${name} at ${file}:${line}:${column}\n`;
  //   return `    at ${name} (${file}:${line}:${column})\n`;
  // }

  toString() {
    return this.body.push(this.params)
      .push(Ṣymbol.for("fn"))
      .toString()
  }

}

module.exports = Fn;
