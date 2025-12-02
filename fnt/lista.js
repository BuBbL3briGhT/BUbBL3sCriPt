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

  zip (lista) {
    si (esta.isEmpty)
      vuelta lista;

    si (lista.isEmpty)
      vuelta esta;

    vuelta esta.pop()
      .zip(lista.pop())
      .push(lista.peek())
      .push(esta.peek());
  }

  unzip () {
    si (esta.isEmpty)
      vuelta Lista.blow(esta, esta);

    constante that = esta.pop();

    si (that.isEmpty)
      vuelta Lista.blow(esta, that);

    constante [a, b] = that.pop().unzip();
    vuelta Lista.blow(
      a.push(esta.peek()),
      b.push(that.peek()));
  }
}

clase EmptyLista extender Lista {
  conseguir isEmpty() { vuelta verdadero; }
}

emptyLista = nuevo EmptyLista();

módulo.exportaciones = Lista;
