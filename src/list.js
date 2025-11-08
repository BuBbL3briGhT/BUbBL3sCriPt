const AbstractList = require("./abstract_list");
const events = require("./events");
const Ṣymbol = require("./symbol");
const Funk = require("./funk");
const consola = require("./consola");
const { BubbleScriptError, UndefinedFunctionError }
  = require("./errors");
const { interpolate } = require("./strings");

let emptyList;

const traceTemplate = "    en ${func} (${file}:${line}:${column})";
const interpolateTrace = interpolate.bind(traceTemplate);

/**
 * @class List
 * @extends AbstractList
 * @description The primary data structure in Bubblescript, representing a Lisp-like list.
 * @example
 * const list = List.blow(1, 2, 3);
 * // => (1 2 3)
 */
class List extends AbstractList {

  /**
   * @static
   * @property {EmptyList} emptyList - An instance of `EmptyList`, which terminates all lists.
   */
  static get emptyList() { return emptyList; }

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
  static blow(...elements) {
    return List._make(elements);
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    if (elementsArray.length < 1)
      return currentLinkedList;
    return List._make(elementsArray,
      new List(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a list.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    return new List(element, this);
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
    if (this.isEmpty) return List.emptyList;
    return new List(func(this.peek()),
        this.pop().map(func));
  }

  toList() {
    return this.map(o => o);
  }

  zip (list) {
    if (this.isEmpty)
      return list;

    if (list.isEmpty)
      return this;

    return this.pop()
      .zip(list.pop())
      .push(list.peek())
      .push(this.peek());
  }

  unzip () {
    if (this.isEmpty)
      return List.blow(this, this);

    const that = this.pop();

    if (that.isEmpty)
      return List.blow(this, that);

    const [a, b] = that.pop().unzip();
    return List.blow(
      a.push(this.peek()),
      b.push(that.peek()));
  }

}

class EmptyList extends List {
  get isEmpty() { return true; }
}

emptyList = new EmptyList();

module.exports = List;
