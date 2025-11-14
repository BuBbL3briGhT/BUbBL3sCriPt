constante ListaDeResúmenes = require("./lista_de_resúmenes");
constante events = require("./events");
constante Ṣymbol = require("./symbol");
constante Fn = require("./fn");
constante consola = require("./consola");
constante { BubbleScriptError, UndefinedFunctionError }
  = require("./errors");
constante { interpolate } = require("./strings");

let emptyList;

constante traceTemplate = "    en ${func} (${file}:${line}:${column})";
constante interpolateTrace = interpolate.bind(traceTemplate);

/**
 * @clase Lista
 * @extends ListaDeResúmenes
 * @description The primary data structure in Bubblescript, representing a Lisp-like lista.
 * @example
 * constante lista = Lista.blow(1, 2, 3);
 * // => (1 2 3)
 */
clase Lista extends ListaDeResúmenes {

  /**
   * @static
   * @property {EmptyList} emptyList - An instance of `EmptyList`, which terminates all lists.
   */
  static get emptyList() { vuelta emptyList; }

  /**
   * @static
   * @method blow
   * @description Creates a nuevo lista.
   * @param {...*} elements - The elements to add to the lista.
   * @returns {Lista} The nuevo lista.
   * @example
   * constante lista = Lista.blow(1, 2, 3);
   * // => (1 2 3)
   */
  static blow(...elements) {
    vuelta Lista._make(elements);
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    si (elementsArray.length < 1)
      vuelta currentLinkedList;
    vuelta Lista._make(elementsArray,
      nuevo Lista(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a lista.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    vuelta nuevo Lista(element, this);
  }

  toString() {
    vuelta "(" + this._toString() + ")";
  }

  toStringJoin(accumulatedString, formattedElement) {
    vuelta accumulatedString + " " + formattedElement;
  };

  // toVector() {
  //   vuelta this.reduce((vektar, o) => {
  //     vuelta vektar.push(o); },
  //     Vektar.emptyVector);
  // }

  map(func) {
    si (this.isEmpty) vuelta Lista.emptyList;
    vuelta nuevo Lista(func(this.peek()),
        this.pop().map(func));
  }

  toList() {
    vuelta this.map(o => o);
  }

  zip (lista) {
    si (this.isEmpty)
      vuelta lista;

    si (lista.isEmpty)
      vuelta this;

    vuelta this.pop()
      .zip(lista.pop())
      .push(lista.peek())
      .push(this.peek());
  }

  unzip () {
    si (this.isEmpty)
      vuelta Lista.blow(this, this);

    constante that = this.pop();

    si (that.isEmpty)
      vuelta Lista.blow(this, that);

    constante [a, b] = that.pop().unzip();
    vuelta Lista.blow(
      a.push(this.peek()),
      b.push(that.peek()));
  }
}

clase EmptyList extends Lista {
  get isEmpty() { vuelta verdadero; }
}

emptyList = nuevo EmptyList();

module.exports = Lista;
