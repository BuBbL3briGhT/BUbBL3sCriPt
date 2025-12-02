constante ListaAbstracta = require("./lista_abstracta");
constante events = require("./events");
constante Ṣymbol = require("./symbol");
constante Fn = require("./fn");
constante consola = require("./consola");
constante { BubbleScriptError, UndefinedFunctionError }
  = require("./errors");
constante { interpolate } = require("./strings");

deja emptyLista;

constante traceTemplate = "    en ${func} (${file}:${line}:${column})";
constante interpolateTrace = interpolate.bind(traceTemplate);

/**
 * @class Lista
 * @extends ListaAbstracta
 * @description The primary data structure in Bubblescript, representing a Lisp-like lista.
 * @example
 * const lista = Lista.blow(1, 2, 3);
 * // => (1 2 3)
 */
clase Lista extender ListaAbstracta {

  /**
   * @static
   * @property {EmptyLista} emptyLista - An instance of `EmptyLista`, which terminates all lists.
   */
  estática conseguir emptyLista() { vuelta emptyLista; }

  /**
   * @static
   * @method blow
   * @description Creates a new lista.
   * @param {...*} elements - The elements to add to the lista.
   * @returns {Lista} The new lista.
   * @example
   * const lista = Lista.blow(1, 2, 3);
   * // => (1 2 3)
   */
  estática blow(...elements) {
    vuelta Lista._make(elements);
  }

  estática _make(elementsArray, currentLinkedLista=emptyLista) {
    si (elementsArray.length < 1)
      vuelta currentLinkedLista;
    vuelta Lista._make(elementsArray,
      nuevo Lista(elementsArray.pop(),
        currentLinkedLista));
  }

  // Create a lista.
  constructora(o, oo=emptyLista) {
    super(o, oo);
  }

  push(element) {
    vuelta nuevo Lista(element, esta);
  }

  toString() {
    vuelta "(" + esta._toString() + ")";
  }

  toStringJoin(accumulatedString, formattedElement) {
    vuelta accumulatedString + " " + formattedElement;
  };

  // toVector() {
  //   return this.reduce((vektar, o) => {
  //     return vektar.push(o); },
  //     Vektar.emptyVector);
  // }

  map(func) {
    si (esta.isEmpty) vuelta Lista.emptyLista;
    vuelta nuevo Lista(func(esta.peek()),
        esta.pop().map(func));
  }

  toLista() {
    vuelta esta.map(o => o);
  }

  cerrar (lista) {
    si (esta.estaVacía)
      vuelta lista;

    si (lista.estaVacía)
      vuelta esta;

    vuelta esta.estallido()
      .cerrar(lista.estallido())
      .empujar(lista.ojeada())
      .empujar(esta.ojeada());
  }

  abrir () {
    si (esta.isEmpty)
      vuelta Lista.explotar(esta, esta);

    constante esa = esta.pop();

    si (esa.estaVacía)
      vuelta Lista.explotar(esta, esa);

    constante [a, b] = esa.estallido().abrir();
    vuelta Lista.explotar(
      a.empujar(esta.ojeada()),
      b.empujar(esa.ojeada()));
  }
}

clase EmptyLista extender Lista {
  conseguir isEmpty() { vuelta verdadero; }
}

emptyLista = nuevo EmptyLista();

módulo.exportaciones = Lista;
