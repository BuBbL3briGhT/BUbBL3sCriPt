import { interpolate } from './strings.js';

import { BubbleScriptError, UndefinedFunctionError } from './errors.js';

// Let's define `AbstractList` which is a class that
// will serve as the abstract base class for `List`
// and `Vektar`. All shared functionality between
// `List` and `Vektar` is centralized here.
export class AbstractList {
  static from(arrayLike, mapFn, thisArg) {
    let array = Array.from(arrayLike, mapFn, thisArg);
    return this.make(...array);
  }

  constructor(o, oo) {
    Object.assign(this, { o, oo });
  }

  peek() {
    return this.o;
  }
  pop() {
    return this.oo;
  }

  get isEmpty() {
    return false;
  }
  get ['isEmpty?']() {
    return this.isEmpty;
  }
  get ['empty?']() {
    return this.isEmpty;
  }
  get first() {
    return this.peek();
  }
  get rest() {
    return this.pop();
  }
  get head() {
    return this.peek();
  }
  get tail() {
    return this.pop();
  }
  get next() {
    return this.pop().peek();
  }
  get last() {
    return !this.pop().isEmpty ? this.pop().last : this.peek();
  }
  get tuple() {
    return [this.o, this.oo];
  }

  count() {
    return this.reduce((i) => i + 1, 0);
  }

  map(fn) {
    if (this.isEmpty) return this;
    return new this.constructor(fn(this.peek()), this.pop().map(fn));
  }

  at(i) {
    return this.skip(i).peek();
  }

  take(count) {
    if (this.isEmpty) return this;

    if (count) return this.pop().take(--count).push(this.peek());

    return this.constructor.make();
  }

  skip(i) {
    if (i && !this.isEmpty) return this.pop().skip(i - 1);
    return this;
  }

  shift() {
    return this.invert().pop().invert();
  }

  select(...properties) {
    return this.map((o) =>
      properties.reduce((memo, key) => {
        memo[key] = o[key];
        return memo;
      }, {}),
    );
  }

  invert() {
    if (this.isEmpty) return this;

    return this.pop().reduce((accumulator, currentElement) => {
      return accumulator.push(currentElement);
    }, this.constructor.make(this.peek()));
  }

  // Conjunta una lista con esta lista.
  conj(list) {
    if (list.isEmpty) return this;
    return this.conj(list.pop()).push(list.peek());
  }

  _toString() {
    if (this.isEmpty) return '';
    return this.map(this.toStringFormat).reduce(this.toStringJoin);
  }

  toStringFormat(o) {
    if (!o) return o;
    switch (typeof o) {
      case 'string':
        return '"' + o + '"';
      case 'symbol':
        return Symbol.keyFor(o);
      default:
        return o.toString();
    }
  }

  toArray() {
    return this.reduce((array, o) => {
      array.push(o);
      return array;
    }, []);
  }

  reduce(fn, memo) {
    if (this.isEmpty) return memo;

    const oo = this.pop();
    if (oo.isEmpty)
      if (memo == undefined) return this.peek();
      else return fn(memo, this.peek());
    else if (memo != undefined) return oo.reduce(fn, fn(memo, this.peek()));
    else return oo.reduce(fn, this.peek());
  }

  each(fn) {
    const result = fn(this.peek());
    // const result = fn.call(this, this.peek(), null, ėval);
    if (this.pop().isEmpty) return result;
    return this.pop().each(fn);
  }

  tryEach(fn, cåtch, pila) {
    // consola.registro("tryEach", {this: this});
    let result;
    try {
      result = fn(this.peek(), pila);
    } catch (o) {
      return cåtch(o, this, fn);
    }
    if (this.pop().isEmpty) return result;
    return this.pop().tryEach(fn, cåtch, pila);
  }

  find(value) {
    if (this.isEmpty) return;
    if (value == this.head) return this;
    else return this.tail.find(value);
  }

  until(value) {
    if (this.isEmpty) return this;
    if (value == this.head) return this.constructor.make();
    else return new this.constructor(this.head, this.tail.until(value));
  }

  split(value) {
    let result = this.constructor.make();
    let sub = this.find(value);
    if (sub) {
      sub = sub.pop();
      if (sub.find(value)) result = sub.split(value);
      else result = result.push(sub);
    }
    result = result.push(this.until(value));
    return result;
  }

  partition(n) {
    if (this.isEmpty) return this;

    return this.skip(n).partition(n).push(this.take(n));
  }

  // Simple little method returns a peek and
  // a pop. Use to skim the list, just to get
  // the head and the tail broken up into a list
  // which can the be destructed into locals
  // or otherwise manipulated. There might be
  // a more conventenal what to do this, but
  // this is serving my purposes for the time begin.
  // #LongLivePlop! ✨️
  plop() {
    return this.constructor.make(this.peek(), this.pop());
  }

  join(delimiter = '') {
    return this.reduce((memo, i) => memo + delimiter + i);
  }

  *[Symbol.iterator]() {
    let currentNode = this;
    while (!currentNode.isEmpty) {
      yield currentNode.o;
      currentNode = currentNode.oo;
    }
  }
}

// Aliases
(function (prototype) {
  prototype['includes?'] = prototype.find;
})(AbstractList.prototype);

let emptyList;

const traceTemplate = '    en ${func} (${file}:${line}:${column})';
const interpolateTrace = interpolate.bind(traceTemplate);

/**
 * @class List
 * @extends AbstractList
 * @description The primary data structure in Bubblescript, representing a Lisp-like list.
 * @example
 * const list = List.make(1, 2, 3);
 * // => (1 2 3)
 */
export class List extends AbstractList {
  /**
   * @static
   * @property {EmptyList} emptyList - An instance of `EmptyList`, which terminates all lists.
   */
  static get emptyList() {
    return emptyList;
  }

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

  static _make(elements, list = emptyList) {
    if (elements.length < 1) return list;
    return List._make(elements, list.push(elements.pop()));
  }

  // Create a list.
  constructor(o, oo = emptyList) {
    super(o, oo);
  }

  // at(index) {
  //   switch (index) {
  //     case 0: return this.o;
  //     case 1: return this.oo;
  //     default:
  //       throw Error("Invaild index: " + index);
  //   }
  // }

  push(element) {
    return new List(element, this);
  }

  toString() {
    return '(' + this._toString() + ')';
  }

  toStringJoin(accumulatedString, formattedElement) {
    return accumulatedString + ' ' + formattedElement;
  }

  map(func) {
    if (this.isEmpty) return List.emptyList;
    return new List(func(this.peek()), this.pop().map(func));
  }

  toList() {
    return this;
  }

  zip(list) {
    if (this.isEmpty) return list;

    if (list.isEmpty) return this;

    return this.pop().zip(list.pop()).push(list.peek()).push(this.peek());
  }

  unzip() {
    if (this.isEmpty) return List.make(this, this);

    const that = this.pop();

    if (that.isEmpty) return List.make(this, that);

    const [a, b] = that.pop().unzip();
    return List.make(a.push(this.peek()), b.push(that.peek()));
  }
}

class EmptyList extends List {
  get isEmpty() {
    return true;
  }
}

emptyList = new EmptyList();

export class LazyList extends List {
  get emptyList() {
    return List.emptyList;
  }

  constructor(itty) {
    if (!itty.next) {
      // Check to see if itty is iterable.
      if (itty[Symbol.iterator]) {
        // if it is call the iterator method to get the iterator.
        itty = itty[Symbol.iterator]();

        // One final check to make sure we got an iterator back from the iterator method.
        if (!itty.next)
          throw Error(
            'Iterator method returned an object that is not an iterator: ' +
              { itty },
          );
      } else {
        // If itty is niether an iterator or iterable (has a Symbol.iterator function) raise an error.
        throw Error(
          'First parameter is niether an iterator nor iterable: ' + { itty },
        );
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
    if (!this.isEmpty) this.set({ oo: new LazyList(this.itty) });

    return this.oo;
  }

  wakeUp() {
    const o = this.itty.next();
    this.set({ o: o.value, isEmpty: o.done });
  }

  set(props) {
    for (const prop in props) {
      Object.defineProperty(this, prop, {
        value: props[prop],
      });
    }
  }

  set o(o) {}
  set oo(oo) {}

  toList() {
    return this.map((o) => o);
  }
}

let emptyVektar;

export class Vektar extends AbstractList {
  static get emptyVektar() {
    return emptyVektar;
  }

  static make(...elements) {
    var head = emptyVektar;
    for (let o of elements) head = new this(o, head);
    return head;
  }

  constructor(o, oo = emptyVektar) {
    super(o, oo);
  }

  push(element) {
    return new Vektar(element, this);
  }

  toString() {
    return '[' + this._toString() + ']';
  }

  toStringJoin(accumulatedString, formattedElement) {
    return formattedElement + ' ' + accumulatedString;
  }

  toList() {
    return this.reduce((list, o) => {
      return list.push(o);
    }, List.emptyList);
  }
}

class EmptyVektar extends Vektar {
  get isEmpty() {
    return true;
  }
}

emptyVektar = new EmptyVektar();

let emptyObjectMap;

export class ObjectMap extends AbstractList {
  static get emptyList() {
    return emptyObjectMap;
  }

  static make(...elements) {
    return ObjectMap._make(elements);
  }

  static _make(elementsArray, currentObjectMap = emptyObjectMap) {
    if (elementsArray.length < 1) return currentObjectMap;
    return List._make(
      elementsArray,
      new List(elementsArray.pop(), currentObjectMap),
    );
  }

  constructor(o, oo = emptyObjectMap) {
    super(o, oo);
  }

  push(element) {
    return new ObjectMap(element, this);
  }

  toString() {
    return '{' + this._toString() + '}';
  }

  toStringJoin(accumulatedString, formattedElement) {
    return accumulatedString + ' ' + formattedElement;
  }

  map(fn) {
    if (this.isEmpty) return ObjectMap.emptyList;
    return new ObjectMap(fn(this.peek()), this.pop().map(fn));
  }

  createObject(binding) {
    const o = Object.create(null);
    for (const key of this) {
      // console.log({key});
      const k = key.toString();
      o[k] = binding[k];
    }
    return o;
  }
}

class EmptyObjectMap extends ObjectMap {
  get isEmpty() {
    return true;
  }
}

emptyObjectMap = new EmptyObjectMap();
