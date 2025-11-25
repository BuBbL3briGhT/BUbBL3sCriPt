constante consola = require("./consola");
constante symbols = Object.create(nulo);

// `Ṣymbol`s are language symbols. Alternatively
// to avoid name clash with the built-in
// Javascript `Symbol` class/object.
clase Ṣymbol {

  constructora(value) {
    si(symbols[value]) {
      throw nuevo Error("Duplicate symbol initalization");
    }

    esta.value = value;

    var fn, segments,
      callPattern = 1;

    si (value !== "/")
      [value, fn] = value.split('/');
    segments = value.split('.');

    si (segments.length == 1 && !fn)
      fn = segments.pop();

    si (!fn)
      [fn, callPattern] = [segments.pop(), 2];

    esta.fn = fn;
    esta.segments = segments;
    esta.callPattern = callPattern;

    vuelta symbols[value] = esta;
  }

  toString() {
    vuelta esta.value;
  }

  valueOf() {
    vuelta esta.value;
  }

  resolveRoot(binding) {
    vuelta esta.segments
      .reduce(función(e, f) {
        vuelta e && e[f]
      }, binding)
  }

  estática para(key) {
    vuelta symbols[key] || nuevo Ṣymbol(key);
  }

}

módulo.exportaciones = Ṣymbol;
