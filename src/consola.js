
const consola = {

  registro(objeto) {
    const trace = {};
    Error.captureStackTrace(trace, this.registro);
    const stackTrace = trace.stack.split("\n");
    console.log(stackTrace[1]);
    switch (typeof objeto) {
      // case "object":
      //   this.registroObjeto(objeto);
      //   break;
      default:
        console.log(objeto);
    }
  },

  registroObjeto(objeto) {
    // for (const llave, valor in objeto) {
    //   if (Object.hasOwn(objeto, llave)) {

    //   }
    // }
  }


}

module. exports = consola ;
