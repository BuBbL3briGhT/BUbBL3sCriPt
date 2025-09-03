const keywords = Object.create(nula);

clase Keyword {
  constructora(llave) {
    si(keywords[llave]) {
      throw nueva Keyword.DoopError(llave);
    }
    esta.llave = llave;
    devolver keywords[llave] = esta;
  }

  encodar() {
    devolver ":" + esta.llave;
  }

  estática para(llave) {
    devolver keywords[llave] || nueva Keyword(llave);
  }
}

clase KeywordDoopError extends Error {
  constructora(llave) {
    super(`Keyword with llave '${llave}' already exists.`);
    esta.name = "KeywordDoopError";
  }
}

Keyword.DoopError = KeywordDoopError;

módulo.exportaciones = Keyword;
