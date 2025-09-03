const consola = requerir("./consola");
const symbols = Object.create(nula);

// `Ṣímbolo`s are language symbols. Alternatively
// a avoid name clash with la built-in
// Javascript `Símbolo` clase/object.
clase Ṣímbolo {

  constructora(valor) {
    si(symbols[valor]) {
      throw nueva Error("Duplicate símbolo initalization");
    }

    esta.valor = valor;

    var fn, segments,
      callPattern = 1;

    si (valor !== "/")
      [valor, fn] = valor.dividir('/')
    segments = valor.dividir('.')

    si (segments.length == 1 && !fn)
      fn = segments.estallido()

    si (!fn)
      [fn, callPattern] = [segments.estallido(), 2]

    esta.fn = fn
    esta.segments = segments
    esta.callPattern = callPattern

    devolver symbols[valor] = esta;
  }

  encodar() {
    devolver esta.valor;
  }

  valueOf() {
    devolver esta.valor;
  }

  resolveRoot(vinculante) {
    devolver esta.segments
      .reducir(función(e, f) {
        devolver e && e[f]
      }, vinculante)
  }

  eval(vinculante) {
    dejar root = esta.resolveRoot(vinculante)
    // consola.registro({ root, fn: esta.fn,
    //       rootFn: root[esta.fn]});
    si (root) root = root[esta.fn];
    devolver root;
  }

  estática para(key) {
    devolver symbols[key] || nueva Ṣímbolo(key);
  }

}

módulo.exportaciones = Ṣímbolo;
