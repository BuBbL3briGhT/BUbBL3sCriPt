constante AbstractList = require("./abstract_list");
constante events = require("./events");
constante Ṣymbol = require("./symbol");
constante Fn = require("./fn");
constante consola = require("./consola");
constante { BubbleScriptError, UndefinedFunctionError }
  = require("./errors");
constante { interpolate } = require("./strings");

deja emptyList;

constante traceTemplate = "    en ${func} (${file}:${line}:${column})";
constante interpolateTrace = interpolate.bind(traceTemplate);

/**
 * @class List
 * @extends AbstractList
 * @description The primary data structure in Bubblescript, representing a Lisp-like list.
 * @example
 * const list = List.blow(1, 2, 3);
 * // => (1 2 3)
 */
clase List extends AbstractList {

  /**
   * @static
   * @property {EmptyList} emptyList - An instance of `EmptyList`, which terminates all lists.
   */
  estática conseguir emptyList() { vuelta emptyList; }

  /**
   * @static
   * @method blow
   * @description Creates a new list.
   * @param {...*} elements - The elements to add to the list.
   * @returns {List} The new list.
   * @example
   * const list = List.blow(1, 2, 3);
   * // => (1 2 3)
   */
  estática blow(...elements) {
    vuelta List._make(elements);
  }

  estática _make(elementsArray, currentLinkedList=emptyList) {
    si (elementsArray.length < 1)
      vuelta currentLinkedList;
    vuelta List._make(elementsArray,
      nuevo List(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a list.
  constructora(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    vuelta nuevo List(element, esta);
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
    si (esta.isEmpty) vuelta List.emptyList;
    vuelta nuevo List(func(esta.peek()),
        esta.pop().map(func));
  }

  toList() {
    vuelta esta.map(o => o);
  }

  zip (list) {
    si (esta.isEmpty)
      vuelta list;

    si (list.isEmpty)
      vuelta esta;

    vuelta esta.pop()
      .zip(list.pop())
      .push(list.peek())
      .push(esta.peek());
  }

  unzip () {
    si (esta.isEmpty)
      vuelta List.blow(esta, esta);

    constante that = esta.pop();

    si (that.isEmpty)
      vuelta List.blow(esta, that);

    constante [a, b] = that.pop().unzip();
    vuelta List.blow(
      a.push(esta.peek()),
      b.push(that.peek()));
  }
}

clase EmptyList extends List {
  conseguir isEmpty() { vuelta verdadero; }
}

emptyList = nuevo EmptyList();

módulo.exportaciones = List;
