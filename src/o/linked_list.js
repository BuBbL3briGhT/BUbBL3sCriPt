let emptyLinkedList;

class LinkedList {

  static linkedListOpenChar = "[";
  static linkedListCloseChar = "]";

  static get emptyLinkedList() { return emptyLinkedList; }

  get isEmpty() { return false; }
  get first() { return peek(this); }
  get rest() { return pop(this); }
  get next() { return peek(pop(this)); }
  get last() { return !pop(this).isEmpty ?
      pop(this).last : peek(this); }

  // Create a linkedList.
  constructor(o, oo=emptyLinkedList) {
    this.o=o;
    this.oo=oo;
  }

  static make(...elements) { // oo -> elements
    var linkedListHead = emptyLinkedList; // ooo -> linkedListHead
    for (let o of elements) // oo -> elements
      linkedListHead = new LinkedList(o, linkedListHead); // ooo -> linkedListHead
    return linkedListHead; // ooo -> linkedListHead
  }

  static from(arrayLike, mapFn, thisArg) { // arryLike -> arrayLike
    let array = Array.from(arrayLike, mapFn, thisArg); // arryLike -> arrayLike
    return LinkedList.make(...array);
  }

  static get(o,i) { return peek(skip(o,i)); }

  static skip(o, count) {
    if (count)
      return skip(pop(o), --count);
    return o;
  }

  static push(linkedList, element) { // oo -> linkedList, o -> element
    return new LinkedList(element, linkedList); // o -> element, oo -> linkedList
  }

  static peek(o) { return o.o; }
  static pop(o) { return o.oo; }

  static count(o) {
    return reduce(o, (count) => {
      return ++count;
    }, 0);
  }

  static shift(o) {
    return invert(pop(invert(o)));
  }

  static invert(o) {
    if (o.isEmpty)
      return o;

    // oo (accumulator), o (currentElement)
    return reduce(pop(o),
      (accumulator, currentElement) => {
        return push(accumulator, currentElement);
      }, make(peek(o)));
  }

  static conj(targetLinkedList, sourceLinkedList) { // o -> targetLinkedList, oo -> sourceLinkedList
    // oo (accumulator), o (currentElement)
    return sourceLinkedList.reduce(function(accumulator, currentElement) {
      return accumulator.push(currentElement);
    }, targetLinkedList); // o -> targetLinkedList
  }

  static toString(o) {
    if (o.isEmpty) return this.linkedListOpenChar + this.linkedListCloseChar; // SURR -> linkedListOpenChar, OUND -> linkedListCloseChar

    let format = (o) => {
      switch (typeof o) {
        case "string":
          return '"' + o + '"';
        case "symbol":
          return Symbol.keyFor(o);
        default:
          return o.toString();
      }
    }

    // oo (accumulatedString), o (formattedElement)
    let join = (accumulatedString, formattedElement) => {
      return formattedElement + " " + accumulatedString;
    }

    return this.linkedListOpenChar + // SURR -> linkedListOpenChar
      reduce(map(o, format), join)
         + this.linkedListCloseChar; // OUND -> linkedListCloseChar
  }

  static toArray(o) {
    // oo (array), o (currentElement)
    return reduce(o, (array, currentElement) => {
      array.push(currentElement); return array; }, []);
  }

  static map(o, fn) {
    if (o.isEmpty) return o;
    return new LinkedList(fn(o.o),
      map(o.oo, fn));
  }

  static reduce(o, fn, memo) {
    if (o.isEmpty) return memo;

    let oo = pop(o);
    if (oo)
      if (memo !== undefined)
        return reduce(oo, fn,
          fn(memo, peek(o)))
      else
        return reduce(oo, fn, peek(o));
    else if(memo !== undefined)
      return fn(memo, peek(o));
    else
      return peek(o);
  }

  static each(o, fn) {
    let oo = fn(peek(o));
    if (pop(o).isEmpty) return oo;
    return each(pop(o), fn);
  }

  //// Members Only ¥ ////

  count() { return count(this); }
  conj(sourceLinkedList) { return conj(this, sourceLinkedList); } // oo -> sourceLinkedList
  each(fn) { return each(this, fn); }
  get(i) { return get(this, i); }
  invert() { return invert(this); }
  map(fn) { return map(this, fn); }
  peek() { return peek(this); }
  pop() { return pop(this); }
  push(element) { return push(this, element); } // o -> element
  reduce(fn, memo) {
    return reduce(this, fn, memo); }
  shift() { shift(this); }
  skip(n) { skip(this, n) };
  toString() { return toString(this); }
  toArray() { return toArray(this); }

  *[Symbol.iterator]() {
    let currentNode = this;
    // Normal linkedList links return false for get isEmpty
    // The emptyLinkedList link, which is the terminal item for all linkedList return true for isEmpty.
    // So, iterate while currentNode is not the emptyLinkedList node indicatex by call to isEmpty.
    // LinkedList links should never be null or undefined, so no need to do a null check, if they are, this would represent a bug somewhere else so we fial on the null ref.
    while (!currentNode.isEmpty) {
      yield currentNode.o;
      currentNode = currentNode.oo;
    }
  }
}

const _toString = LinkedList.toString;
const toString = _toString.bind(LinkedList);
toString.toString = _toString;
LinkedList.toString = toString;

const {count, conj, each, get, invert,
  map, make, peek, pop, push, reduce,
  shift, skip, toArray } = LinkedList

class EmptyLinkedList {
  get isEmpty() { return true; }
  *[Symbol.iterator]() { }
  toString() { return "[]"; }
}

emptyLinkedList = new EmptyLinkedList()

module.exports = LinkedList;
