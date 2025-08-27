
const consola = {

  registro(...mensajes) {
    // this.registroPuntoDeCódigo(this.registro);
    console.log(...mensajes);
  },

  registrö(...mensajes) {
    console.log(...mensajes);
    this.registroPuntoDeCódigo(this.registrö);
  },

  registroPuntoDeCódigo(arriba) {
    const trace = {};
    Error.captureStackTrace(trace, arriba);
    const stackTrace = trace.stack.split("\n");
    console.log(stackTrace[1]);
  }

}

module.exports = consola ;
