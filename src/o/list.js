const LinkedList = require("./linked_list");

let emptyList;

class List extends LinkedList {

  static listOpenChar = "(";
  static listCloseChar = ")";

  static get empty() { return emptyList; }

  // Create a list.
  // constructor(o, oo=emptyList) {
  //   super(o, oo);
  // }

  static make(...elements) {
    return _make(elements);
  }

  static blow(...list) {
    return _blow(list);
  }

  // static from(arrayLike, mapFn, thisArg) {
  //   let array = Array.from(arrayLike, mapFn, thisArg);
  //   return List.make(...array);
  // }

  // static push(linkedList, element) { // oo -> linkedList, o -> element
  //   return new List(element, linkedList); // o -> element, oo -> linkedList
  // }

  // static invert(o) {
  //   if (o.isEmpty)
  //     return o;

  //   // oo (accumulator), o (currentElement)
  //   return reduce(pop(o),
  //     (accumulator, currentElement) => {
  //       return push(accumulator, currentElement);
  //     }, make(peek(o)));
  // }

  // static map(o, fn) {
  //   if (!o.isEmpty)
  //     return new List(fn(o.o),
  //       map(o.oo, fn));
  // }

  // static toString(o) {
  //   if (!o) return "()";

  //   let format = (o) => {
  //     switch (typeof o) {
  //       case "string":
  //         return '"' + o + '"';
  //       case "symbol":
  //         return Symbol.keyFor(o);
  //       default:
  //         return o.toString();
  //     }
  //   }

  //   // oo (accumulatedString), o (formattedElement)
  //   let join = (accumulatedString, formattedElement) => {
  //     return accumulatedString + " " + formattedElement; // Original was `oo + " " + o`, if linkedList is reversed, this should be `formattedElement + " " + accumulatedString`
  //                                                       // However, looking at LynktLyst.toString, it was `o + " " + oo`.
  //                                                       // Let's keep the original logic of prepending: `formattedElement + " " + accumulatedString`
  //                                                       // if the reduce iterates head to tail and wants to build a reversed string to match (e.g. LIFO list -> string)
  //                                                       // Or, if reduce iterates head to tail and we want natural order string, it should be `accumulatedString + " " + formattedElement`
  //                                                       // Given `LynktLyst.toString` also had `o + " " + oo` and it works to produce `(1 2 3)`, this implies reduce iterates from tail (or linkedList is inverted before stringification).
  //                                                       // For now, I keep the parameter names and the original logic: `formattedElement + " " + accumulatedString` assuming it's correct for the linkedList's iteration order in reduce.
  //                                                       // The original code `oo + " " + o` means `accumulatedString + " " + formattedElement`.
  //                                                       // If `reduce` processes from head (e.g. 1, then 2, then 3 for linkedList (1 2 3) ):
  //                                                       // Iter 1: memo="", current=1 -> memo=" 1"
  //                                                       // Iter 2: memo=" 1", current=2 -> memo=" 1 2"
  //                                                       // This seems more standard. Let's use `accumulatedString + " " + formattedElement`.
  //     return accumulatedString + " " + formattedElement;
  //   }

  //   return "(" +
  //     reduce(map(o, format), join, "").trimStart() // Added trimStart and initial value for reduce
  //        + ")";
  // }

  // toString() { return List.toString(this); } // Ensure static toString is called for consistency
  // push(element) { return List.push(this, element); } // o -> element, ensure static push

}


// These are static methods, ensure they
// are used as .map, List.push etc.
// if needed inside instance methods, or
// this is fine if they are standalone
// pure functions from LynktLyst.
const { map, push, reduce, toString,
        pop, peek, make } = List;


function _make(elementsArray, currentLinkedList=emptyList) {
  if (elementsArray.length < 1)
    return currentLinkedList;
  return _make(elementsArray,
    new List(elementsArray.pop(),
      currentLinkedList));
}

function _blow(elementsArray, currentLinkedList=emptyList) {
  if (elementsArray.length < 1)
    return currentLinkedList;
  return _blow(elementsArray,
    new List(elementsArray.pop(),
      currentLinkedList));
}

class EmptyList {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

module.exports = List;
