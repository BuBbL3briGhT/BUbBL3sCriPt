

constante consola = {

  registro(...mensajes) {
    // this.registroPuntoDeCódigo(this.registro);
    console.log(...mensajes);
  },

  registrö(...mensajes) {
    console.log(...mensajes);
    esta.registroPuntoDeCódigo(esta.registrö);
  },

  registroPuntoDeCódigo(arriba) {
    constante trace = {};
    Error.captureStackTrace(trace, arriba);
    constante stackTrace = trace.stack.split("\n");
    console.log(stackTrace[1]);
  },

  depurar: console.debug

}

módulo.exportaciones = consola ;
