const List = require("./list");

// const ;
// extenda(, Lista);
// for (
// open(, function () {
//   this.
// });

class Stack extends List {

  static make(...elements) {
    return _make(elements);
  }

  static from(arrayLike, mapFn, thisArg) {
    let array = Array.from(arrayLike, mapFn, thisArg);
    return Stack.make(...array);
  }

  static push(list, element) { // oo -> list, o -> element
    return new Stack(element, list); // o -> element, oo -> list
  }


  static map(o, fn) {
    if (o)
      return new Stack(fn(o.o),
        map(o.oo, fn));
  }

  static toString(o) {
    if (!o) return "()";

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
      return accumulatedString + " " + formattedElement; // Original was `oo + " " + o`, if list is reversed, this should be `formattedElement + " " + accumulatedString`
                                                        // However, looking at LynktLyst.toString, it was `o + " " + oo`.
                                                        // Let's keep the original logic of prepending: `formattedElement + " " + accumulatedString`
                                                        // if the reduce iterates head to tail and wants to build a reversed string to match (e.g. LIFO stack -> string)
                                                        // Or, if reduce iterates head to tail and we want natural order string, it should be `accumulatedString + " " + formattedElement`
                                                        // Given `LynktLyst.toString` also had `o + " " + oo` and it works to produce `(1 2 3)`, this implies reduce iterates from tail (or list is inverted before stringification).
                                                        // For now, I keep the parameter names and the original logic: `formattedElement + " " + accumulatedString` assuming it's correct for the list's iteration order in reduce.
                                                        // The original code `oo + " " + o` means `accumulatedString + " " + formattedElement`.
                                                        // If `reduce` processes from head (e.g. 1, then 2, then 3 for list (1 2 3) ):
                                                        // Iter 1: memo="", current=1 -> memo=" 1"
                                                        // Iter 2: memo=" 1", current=2 -> memo=" 1 2"
                                                        // This seems more standard. Let's use `accumulatedString + " " + formattedElement`.
      return accumulatedString + " " + formattedElement;
    }

    return "(" +
      reduce(map(o, format), join, "").trimStart() // Added trimStart and initial value for reduce
         + ")";
  }

  toString() { return Stack.toString(this); } // Ensure static toString is called for consistency
  push(element) { return Stack.push(this, element); } // o -> element, ensure static push

}

const { map, push, reduce, toString } = // These are static methods, ensure they are used as .map, Stack.push etc. if needed inside instance methods, or this is fine if they are standalone pure functions from LynktLyst.
  Stack;


function _make(elementsArray, currentList) {
  if (elementsArray.length < 1) return currentList;
  return _make(elementsArray, new Stack(elementsArray.pop(), currentList));
}

module.exports = Stack;
