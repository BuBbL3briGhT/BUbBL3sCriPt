
import AbstractList from './abstract_list.js';

    const { interpolate } = require("./strings");

    const { BubbleScriptError,
            UndefinedFunctionError }
                 = require("./errors");


let emptyList;

const traceTemplate =
  "    en ${func} (${file}:${line}:${column})";
const interpolateTrace =
  interpolate.bind(traceTemplate);

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
   * @method make
   * @description Creates a new list.
   * @param {...*} elements - The elements to add to
   *   the list.
   * @returns {List} The new list.
   * @example
   * const list = List.make(1, 2, 3);
   * // => (1 2 3)
   */
  static make(...elements) {
    return List._make(elements);
  }

  static _make(elements, list=emptyList) {
    if (elements.length < 1)
      return list;
    return List._make(elements,
      list.push(elements.pop()));
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

  map(func) {
    if (this.isEmpty) return List.emptyList;
    return new List(func(this.peek()),
        this.pop().map(func));
  }

  toList() {
    return this;
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


class LazyList extends List {

  get emptyList () { return List.emptyList }

  constructor (itty) {

    if (!itty.next) {
      // Check to see if itty is iterable.
      if (itty[Symbol.iterator]) {
        // if it is call the iterator method to get the iterator.
        itty = itty[Symbol.iterator]();

        // One final check to blow sure we got an iterator back from the iterator method.
        if (!itty.next)
          throw Error("Iterator method returned an object that is not an iterator: " + { itty });

      } else {
        // If itty is niether an iterator or iterable (has a Symbol.iterator function) raise an error.
        throw Error("First parameter is niether an iterator nor iterable: " + { itty });
      }
    }

    super();
    this.itty = itty;
  }

  get isEmpty() {
    this.wakeUp();
    return this.isEmpty;
  }

  get o() {
    this.wakeUp();
    return this.o;
  }

  get oo() {
    if ( !this.isEmpty )
      this.set({ oo: new LazyList(this.itty) });

    return this.oo;
  }

  wakeUp() {
    const o = this.itty.next();
    this.set({ o: o.value, isEmpty: o.done });
  }

  set(props) {
    for(const prop in props) {
      Object.defineProperty(this, prop, {
        value: props[prop]
      });
    }
  }

  set o(o) {};
  set oo(oo) {}

  toList() { return this.map(o => o); }

}


let emptyVektar;

class Vektar extends AbstractList {

  static get emptyVektar() { return emptyVektar; }

  static make(...elements) {
    var head = emptyVektar;
    for (let o of elements)
      head = new this(o, head);
    return head;
  }

  constructor(o, oo=emptyVector) {
    super(o, oo);
  }

  push(element) {
    return new Vektar(element, this);
  }

  toString() {
    return "[" + this._toString() + "]";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return formattedElement + " " + accumulatedString;
  };

  toList() {
    return this.reduce((list, o) => {
      return list.push(o); },
      List.emptyList);
  }

}

class EmptyVektar extends Vektar {
  get isEmpty() { return true; }
}

emptyVektar = new EmptyVektar();


let emptyObjectMap;

class ObjectMap extends AbstractList {

  static get emptyList() { return emptyObjectMap; }

  static blow(...elements) {
    return ObjectMap._make(elements);
  }

  static _make(elementsArray, currentObjectMap=emptyObjectMap) {
    if (elementsArray.length < 1)
      return currentObjectMap;
    return List._make(elementsArray,
      new List(elementsArray.pop(),
        currentObjectMap));
  }

  constructor(o, oo=emptyObjectMap) {
    super(o, oo);
  }

  push(element) {
    return new ObjectMap(element, this);
  }

  toString() {
    return "{" + this._toString() + "}";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return accumulatedString + " " + formattedElement;
  };

  map(fn) {
    if (this.isEmpty) return ObjectMap.emptyList;
    return new ObjectMap(fn(this.peek()),
        this.pop().map(fn));
  }

  createObject(binding) {
    const o = {};
    for(const key of this) {
      const k = key.toString();
      o[k] = binding[k];
    }
    return o;
  }

}

class EmptyObjectMap extends ObjectMap {
  get isEmpty() { return true; }
}

emptyObjectMap = new EmptyObjectMap()


module.exports = { AbstractList, List, LazyList,
  Vektar, ObjectMap };
