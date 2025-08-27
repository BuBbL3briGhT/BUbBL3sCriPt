const AbstractList = require("./abstract_list");
const events = require("./events");

const Ṣymbol = require("./symbol");

let emptyList, MacroExpanded;

function call(binding, fn, params) {
  switch (fn.constructor) {
    case Function:
      return fn.call(binding,
        ...params.mapEval(binding));
  }

  return fn.call(binding, params);
}

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

  // call(binding, params) {
  //   const value = this.eval(binding);

  //   switch (value.constructor) {
  //     case Function:
  //       return value.call(binding,
  //         ...params.mapEval(binding));
  //   }

  //   return value.call(binding, params);
  // }

  call(binding, params) {
    call(binding, this.eval(binding), params);
  }

  eval(binding) {
    // List evaluation logic.
    return this.head.call(binding, this.tail);

    // const headValue = this.head.eval(binding);
    // // console.log({head: this.head, headValue});
    // switch (headValue.constructor) {
    //   case Function:
    //     return headValue.call(binding,
    //       ...this.tail.mapEval(binding));
    // }

    // return headValue.call(binding, this.tail);

    // const headValue = this.head.eval(binding);
    // switch (this.head.constructor) {
    //   case Ṣymbol:
    //     if (this.head.callPattern === 2) {
    //       return headValue.call(binding,
    //         ...this.tail.mapEval(binding));
    //     }
    // }
    // return headValue.call(binding, this.tail);

    // return this.head
    //            .eval(binding)
    //            .call(binding, this.tail);


    // return headValue.eval(tail);
    // const headValue = head.eval(binding);
    // return headValue.eval(tail);

    // switch (head.constructor) {
    //   case Ṣymbol:
    //     const headValue = head.eval(binding);
    //     return tail.push(headValue).eval();
    //   case List:
    //     const headValue = head.eval(binding);
    //     return ëvalList(binding, tail.push(headValue));
    //   case Fn:
    //     return head.invoke(tail.mapEval(binding));
    //   case Function:
    //     return head.call(binding, tail);
    //   case Macro:
    //     const expanded = head.expand(tail);
    //     throw new MacroExpanded(expanded);
    //   default:
    //     return undefined;
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
