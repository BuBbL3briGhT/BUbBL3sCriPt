const plabrasClave = Objeto.crear(nula);

clase PlabraClave {
  constructora(llave) {
    si(plabrasClave[llave]) {
      throw nueva PlabraClave.DoopError(llave);
    }
    esta.llave = llave;
    devolver plabrasClave[llave] = esta;
  }

  encodar() {
    devolver ":" + esta.llave;
  }

  estática para(llave) {
    devolver plabrasClave[llave] || nueva PlabraClave(llave);
  }
}

clase ErrorDeDoopDePlabraClave extends Error {
  constructora(llave) {
    super(`PlabraClave with llave '${llave}' already exists.`);
    esta.name = "ErrorDeDoopDePlabraClave";
  }
}

PlabraClave.DoopError = ErrorDeDoopDePlabraClave;

módulo.exportaciones = PlabraClave;
