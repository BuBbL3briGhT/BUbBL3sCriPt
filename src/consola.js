
const consola = {

  registro(...mensajes) {
    const trace = {};
    Error.captureStackTrace(trace, this.registro);
    const stackTrace = trace.stack.split("\n");
    console.log(stackTrace[1]);
    for(const mensaje of mensajes) {
      switch (typeof mensaje) {
        // case "object":
        //   this.registroObjeto(objeto);
        //   break;
        default:
          console.log(mensaje);
      }
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
