const AbstractList = require("./lista_abstractia");
const events = require("./events");
const Ṣymbol = require("./symbol");
const Funk = require("./funk");
const consola = require("./consola");
const { BubbleScriptError, UndefinedFunctionError }
  = require("./errors");
const { interpolate } = require("./strings");

let emptyList, MacroExpanded;

events.on("init", function (bubls) {
  MacroExpanded = require("./macro").MacroExpanded;
});

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

  /**
   * @method evalEach
   * @description Evaluates each element of the list and returns the result of the last evaluation.
   * @param {Object} binding - The binding to evaluate the elements in.
   * @param {List} [stack=List.blow()] - The evaluation stack.
   * @returns {*} The result of the last evaluation.
   */
  evalEach(binding, stack) {
    // consola.registro("evalEach", {this: this});
    return this.tryEach(evalExpression.bind(binding),
                        catchExpandMacro, stack);
  }

  mapEval(binding) {
    return this.map(evalExpression.bind(binding));
  }

}

class EmptyList extends List {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

function catchExpandMacro(o, list, funk) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    list.o  = expanded.first;
    list.oo = list.rest.conj(expanded.rest.invert());
    return list.tryEach(funk, catchExpandMacro);
  } else {
    throw o;
  }
}

module.exports = List;
