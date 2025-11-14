const ListaDeResúmenes = require("./lista_de_resúmenes");
const events = require("./events");
const Ṣymbol = require("./symbol");
const Fn = require("./fn");
const consola = require("./consola");
const { BubbleScriptError, UndefinedFunctionError }
  = require("./errors");
const { interpolate } = require("./strings");

let emptyList;

const traceTemplate = "    en ${func} (${file}:${line}:${column})";
const interpolateTrace = interpolate.bind(traceTemplate);

/**
 * @class Lista
 * @extends ListaDeResúmenes
 * @description The primary data structure in Bubblescript, representing a Lisp-like lista.
 * @example
 * const lista = Lista.blow(1, 2, 3);
 * // => (1 2 3)
 */
class Lista extends ListaDeResúmenes {

  /**
   * @static
   * @property {EmptyList} emptyList - An instance of `EmptyList`, which terminates all lists.
   */
  static get emptyList() { return emptyList; }

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
  static blow(...elements) {
    return Lista._make(elements);
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    if (elementsArray.length < 1)
      return currentLinkedList;
    return Lista._make(elementsArray,
      new Lista(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a lista.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    return new Lista(element, this);
  }

  toString() {
    return "(" + this._toString() + ")";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return accumulatedString + " " + formattedElement;
  };

  // toVector() {
  //   return this.reduce((vektar, o) => {
  //     return vektar.push(o); },
  //     Vektar.emptyVector);
  // }

  map(func) {
    if (this.isEmpty) return Lista.emptyList;
    return new Lista(func(this.peek()),
        this.pop().map(func));
  }

  toList() {
    return this.map(o => o);
  }

  zip (lista) {
    if (this.isEmpty)
      return lista;

    if (lista.isEmpty)
      return this;

    return this.pop()
      .zip(lista.pop())
      .push(lista.peek())
      .push(this.peek());
  }

  unzip () {
    if (this.isEmpty)
      return Lista.blow(this, this);

    const that = this.pop();

    if (that.isEmpty)
      return Lista.blow(this, that);

    const [a, b] = that.pop().unzip();
    return Lista.blow(
      a.push(this.peek()),
      b.push(that.peek()));
  }
}

class EmptyList extends Lista {
  get isEmpty() { return true; }
}

emptyList = new EmptyList();

module.exports = Lista;
