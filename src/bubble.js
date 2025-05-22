const LynktLysta = require("./lynkt_lyst");

// const Bubble;
// extenda(Bubble, Lista);
// for (
// open(Bubble, function () {
//   this.
// });

class Bubble extends LynktLysta {

  // Blow bubbles faster.
  static blow(...elements) { // oo -> elements
    return _blow(elements); // oo -> elements
  }

  // Blow a bunch of lynktLysts from an
  // Javascript iterable or array-like
  // object.
  //
  // Parameters are passed directly to
  // Array.from and the result is then
  // blown into lynktLysts.
  static from(arrayLike, mapFn, thisArg) { // arryLike -> arrayLike
    let array = Array.from(arrayLike, mapFn, thisArg); // arryLike -> arrayLike
    return Bubble.blow(...array);
  }

  static push(list, element) { // oo -> list, o -> element
    return new Bubble(element, list); // o -> element, oo -> list
  }


  static map(o, fn) {
    if (o)
      return new Bubble(fn(o.o),
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

  toString() { return Bubble.toString(this); } // Ensure static toString is called for consistency
  push(element) { return Bubble.push(this, element); } // o -> element, ensure static push

}

const { map, push, reduce, toString } = // These are static methods, ensure they are used as Bubble.map, Bubble.push etc. if needed inside instance methods, or this is fine if they are standalone pure functions from LynktLyst.
  Bubble;


function _blow(elementsArray, currentList) { // a -> elementsArray, bubble -> currentList
  if (elementsArray.length < 1) return currentList; // a -> elementsArray, bubble -> currentList
  // a -> elementsArray, bubble -> currentList, a -> elementsArray, bubble -> currentList
  return _blow(elementsArray, new Bubble(elementsArray.pop(), currentList));
}

module.exports = Bubble;
