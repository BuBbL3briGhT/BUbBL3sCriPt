let emptyLinkedList;

class LinkedList {

  static listOpenChar = "";
  static listCloseChar = "";

  static get empty() { return emptyLinkedList; }

  get isEmpty() { return false; }
  get first() { return peek(this); }
  get rest() { return pop(this); }
  get next() { return peek(pop(this)); }
  get last() { return !pop(this).isEmpty ?
      pop(this).last : peek(this); }

  // Create a linkedList.
  constructor(o, oo=this.empty) {
    this.o=o;
    this.oo=oo;
  }

  static count(o) {
    return reduce(o, (count) => {
      return ++count;
    }, 0);
  }

  static make(...elements) {
    var head = this.empty;
    for (let o of elements)
      head = new this(o, head);
    return head;
  }

  static push(vector, element) {
    return new this(element, vector);
  }

  static map(o, fn) {
    if (o.isEmpty) return o;
    return new this(fn(o.o),
      map(o.oo, fn));
  }

  static from(arrayLike, mapFn, thisArg) {
    let array = Array.from(arrayLike, mapFn, thisArg);
    return this.make(...array);
  }

  static get(o,i) { return peek(skip(o,i)); }

  static skip(o, count) {
    if (count)
      return skip(pop(o), --count);
    return o;
  }

  static peek(o) { return o.o; }
  static pop(o) { return o.oo; }

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

  static toString(o, listOpenChar, listCloseChar, join) {
    if (o.isEmpty) return listOpenChar + listCloseChar;

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

    return listOpenChar +
      reduce(map(o, format), join)
         + listCloseChar;
  }

  static toArray(o) {
    return reduce(o, (array, currentElement) => {
      array.push(currentElement); return array; }, []);
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
  conj(sourceLinkedList) { return this.constructor.conj(this, sourceLinkedList); } // oo -> sourceLinkedList
  each(fn) { return this.constructor.each(this, fn); }
  get(i) { return this.constructor.get(this, i); }
  invert() { return this.constructor.invert(this); }
  map(fn) { return this.constructor.map(this, fn); }
  peek() { return this.constructor.peek(this); }
  pop() { return this.constructor.pop(this); }
  push(element) { return this.constructor.push(this, element); } // o -> element
  reduce(fn, memo) {
    return this.constructor.reduce(this, fn, memo); }
  shift() { this.constructor.shift(this); }
  skip(n) { this.constructor.skip(this, n) };
  toString() { return toString(this, this.listOpenChar, this.listCloseChar,
    (accumulatedString, formattedElement) => {
      return formattedElement + " " + accumulatedString;
    }); }
  toArray() { return this.constructor.toArray(this); }

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

// const _toString = LinkedList.toString;
// const toString = _toString.bind(LinkedList);
// toString.toString = _toString;
// LinkedList.toString = toString;

const {count, conj, each, get, invert,
  map, make, peek, pop, push, reduce,
  shift, skip, toArray } = LinkedList

class EmptyLinkedList {
  get isEmpty() { return true; }
  *[Symbol.iterator]() { }
  toString() { return ""; }
}

emptyLinkedList = new EmptyLinkedList()

module.exports = LinkedList;
