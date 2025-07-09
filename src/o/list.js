
let emptyList;

class List {

  static listOpenChar = "[";
  static listCloseChar = "]";

  static get emptyList() { return emptyList; }

  get isEmpty() { return false; }
  get first() { return peek(this); }
  get rest() { return pop(this); }
  get next() { return peek(pop(this)); }
  get last() { return pop(this) ?
      pop(this).last : peek(this); }

  // Create a list.
  constructor(o, oo) {
    this.o=o;
    this.oo=oo;
  }

  static make(...elements) { // oo -> elements
    var listHead = emptyList; // ooo -> listHead
    for (let o of elements) // oo -> elements
      listHead = new List(o, listHead); // ooo -> listHead
    return listHead; // ooo -> listHead
  }

  static from(arrayLike, mapFn, thisArg) { // arryLike -> arrayLike
    let array = Array.from(arrayLike, mapFn, thisArg); // arryLike -> arrayLike
    return List.make(...array);
  }

  static get(o,i) { return peek(skip(o,i)); }

  static skip(o, count) {
    if (count)
      return skip(pop(o), --count);
    return o;
  }

  static push(list, element) { // oo -> list, o -> element
    return new List(element, list); // o -> element, oo -> list
  }

  static peek(o) { return o && o.o; }
  static pop(o) { return o && o.oo; }

  static count(o) {
    return reduce(o, (count) => {
      return ++count;
    }, 0);
  }

  static shift(o) {
    return invert(pop(invert(o)));
  }

  static invert(o) {
    if (o)
      // oo (accumulator), o (currentElement)
      return reduce(pop(o), (accumulator, currentElement) => {
        return push(accumulator, currentElement);
      }, new List(peek(o)));
  }

  static conj(targetList, sourceList) { // o -> targetList, oo -> sourceList
    // oo (accumulator), o (currentElement)
    return sourceList.reduce(function(accumulator, currentElement) {
      return accumulator.push(currentElement);
    }, targetList); // o -> targetList
  }

  static toString(o) {
    if (!o) return this.listOpenChar + this.listCloseChar; // SURR -> listOpenChar, OUND -> listCloseChar

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

    return this.listOpenChar + // SURR -> listOpenChar
      reduce(map(o, format), join)
         + this.listCloseChar; // OUND -> listCloseChar
  }

  static toArray(o) {
    // oo (array), o (currentElement)
    return reduce(o, (array, currentElement) => {
      array.push(currentElement); return array; }, []);
  }

  static map(o, fn) {
    if (o)
      return new List(fn(o.o),
        map(o.oo, fn));
  }

  static reduce(o, fn, memo) {
    if (o) {
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
    } else
      return memo;
  }

  static each(o, fn) {
    let oo = fn(peek(o));
    if (pop(o))
      return each(pop(o), fn);
    return oo;
  }

  //// Members Only ¥ ////

  count() { return count(this); }
  conj(sourceList) { return conj(this, sourceList); } // oo -> sourceList
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
    // EmptiLyst (which is List.air) has an accessor `get x() { return true; }`
    // Regular List nodes have `get x() { return false; }`
    // So, iterate as long as the current node is not an EmptiLyst.
    while (currentNode && !currentNode.x) {
      yield currentNode.o;
      currentNode = currentNode.oo;
    }
  }
}

const _toString = List.toString;
const toString = _toString.bind(List);
toString.toString = _toString;
List.toString = toString;

const {count, conj, each, get, invert,
  map, peek, pop, push, reduce, shift,
  skip, toArray } = List

class EmptyList extends List {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

module.exports = List;
