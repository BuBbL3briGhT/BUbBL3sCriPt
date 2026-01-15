
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: src/fn.js                *
   *   Date: December, 2025           *
   *   Library: Bubblescript          *
   *   version:                       *
   *   Version:                       *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

import { createBinding } from "./binding.js";
import Ṣymbol from "./symbol.js";

export default class Fn {
  constructor(binding, params, body, opts={}) {
    Object.assign(this, { binding, params, body });
    Object.assign(this, opts);
  }

  static call(binding, fn, params, pila, ėval) {
    switch (fn.constructor) {
      case Function:
        // console.log({params});
        params = ėval.evalParams(binding, params);
        // console.log({params}, "🧀");
        // console.log({params: params.toString()});
        // console.log({fn: fn.toString()});
        // return fn.call(binding, ...params);
        // console.log("🦆", fn.prototype);
        return fn(...params);
    }

    console.log({fn});
    console.log({"fn.call": fn.call});
    return fn.call(binding, params, pila, ėval);
  }

  call(vínculo, params, pila, ėval) {
    const fnBinding = createBinding(this.binding,
      this.params,
      ėval.mapEval(vínculo, params));

    return ėval.evalEach(fnBinding, this.body, pila);
  }

  // get trace () {
  //   const { name, file, line, column } = this;
  //   // return ` ${name} at ${file}:${line}:${column}\n`;
  //   return `    at ${name} (${file}:${line}:${column})\n`;
  // }

  toString() {
    return this.body.push(
      this.params.push(Ṣymbol.for("fn"))) .toString();
  }

}
