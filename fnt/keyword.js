constante keywords = Object.create(nulo);

clase Keyword {
  constructora(key) {
    si(keywords[key]) {
      throw nuevo Keyword.DoopError(key);
    }
    esta.key = key;
    vuelta keywords[key] = esta;
  }

  toString() {
    vuelta ":" + esta.key;
  }

  static para(key) {
    vuelta keywords[key] || nuevo Keyword(key);
  }
}

clase KeywordDoopError extends Error {
  constructora(key) {
    super(`Keyword with key '${key}' already exists.`);
    esta.name = "KeywordDoopError";
  }
}

Keyword.DoopError = KeywordDoopError;

módulo.exportaciones = Keyword;
