const AbstractList = require("./abstract_list");
const events = require("./events");
const Ṣymbol = require("./symbol");
const Fn = require("./fn");
const consola = require("./consola");

let emptyList, MacroExpanded;

events.on("init", function (bubls) {
  MacroExpanded = require("./macro").MacroExpanded;
});

// `List` extends `AbstractList` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// list. e.g. `(1 2 3)`
class List extends AbstractList {

  // `List.emptyList` provides an instance
  // of `EmptyList`, which terminates all
  // lists.
  static get emptyList() { return emptyList; }

  // `List.make` makes/creates a new list.
  // `List.make(1, 2, 3)`
  static make(...elements) {
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
  //   return this.reduce((vector, o) => {
  //     return vector.push(o); },
  //     Vector.emptyVector);
  // }

  map(fn) {
    if (this.isEmpty) return List.emptyList;
    return new List(fn(this.peek()),
        this.pop().map(fn));
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
      return List.make(this, this);

    const that = this.pop();

    if (that.isEmpty)
      return List.make(this, that);

    const [a, b] = that.pop().unzip();
    return List.make(
      a.push(this.peek()),
      b.push(that.peek()));
  }

  eval(binding) {
    // List evaluation logic.
    // consola.registro({head: this.head,
    //    headValue: this.head.eval(binding) });
    return Fn.call(binding,
         this.head.eval(binding), this.tail);
  }

  each(fn) {
    let result;
    try {
      result = fn(this.peek());
    } catch (o) {
      if (o instanceof MacroExpanded) {
        let expanded = o.expanded;
        this.o  = expanded.first;
        this.oo = this.rest.conj(expanded.rest.invert());
        return this.each(fn);
      } else {
        throw o;
      }
    }
    if (this.pop().isEmpty) return result;
    return this.pop().each(fn);
  }

}

class EmptyList extends List {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

module.exports = List;
