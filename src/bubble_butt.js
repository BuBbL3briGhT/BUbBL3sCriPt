const AbstractList = require("./abstract_list");
const events = require("./events");
const Ṣymbol = require("./symbol");
const Fn = require("./fn");
const consola = require("./consola");
const { BubbleScriptError, ErrorDeFuncíonIndefinida }
  = require("./errors");
const { interpolar } = require("./strings");

let emptyList, MacroExpanded;

events.on("init", function (bubls) {
  MacroExpanded = require("./macro").MacroExpanded;
});

const trazaPlantilla = "    en ${fn} (${file}:${line}:${column})";
const interpolarTrazaPlantilla = interpolar.bind(trazaPlantilla);

// `BubbleButt` extends `AbstractList` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// bubbleButt. e.g. `(1 2 3)`
class BubbleButt extends AbstractList {

  // `BubbleButt.emptyList` provides an instance
  // of `EmptyList`, which terminates all
  // lists.
  static get emptyList() { return emptyList; }

  // `BubbleButt.make` makes/creates a new bubbleButt.
  // `BubbleButt.make(1, 2, 3)`
  static make(...elements) {
    return BubbleButt._make(elements);
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    if (elementsArray.length < 1)
      return currentLinkedList;
    return BubbleButt._make(elementsArray,
      new BubbleButt(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a bubbleButt.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    return new BubbleButt(element, this);
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
    if (this.isEmpty) return BubbleButt.emptyList;
    return new BubbleButt(fn(this.peek()),
        this.pop().map(fn));
  }

  toList() {
    return this.map(o => o);
  }

  zip (bubbleButt) {
    if (this.isEmpty)
      return bubbleButt;

    if (bubbleButt.isEmpty)
      return this;

    return this.pop()
      .zip(bubbleButt.pop())
      .push(bubbleButt.peek())
      .push(this.peek());
  }

  unzip () {
    if (this.isEmpty)
      return BubbleButt.make(this, this);

    const that = this.pop();

    if (that.isEmpty)
      return BubbleButt.make(this, that);

    const [a, b] = that.pop().unzip();
    return BubbleButt.make(
      a.push(this.peek()),
      b.push(that.peek()));
  }

  eval(vínculo, pila=BubbleButt.make()) {
    try {
      const { file, line, column } = this;
      pila = pila.push({fn: this.head.toString(),
          file, line, column});

      const fn = this.head.eval(vínculo);

      if (fn == undefined) {
        const Error = ErrorDeFuncíonIndefinida;
        throw new Error(vínculo, this.head, pila);
      }

      return Fn.call(vínculo, fn, this.tail, pila);

    } catch (error) {
      switch (error.constructor){
        case ErrorDeFuncíonIndefinida:
          if (error.__memo) {
            const memo = error.__memo;
            error.stack += interpolarTrazaPlantilla({
              fn: this.head,
              file: memo.file,
              line: memo.line,
              column: memo.column
            }) + "\n";
          }
          const { file, line, column } = this;
          error.__memo = { file, line, column }
          break;
      }
      throw error;
    }
  }

  evalEach(vínculo, pila) {
    return this.tryEach(evalExpression.bind(vínculo),
                        catchExpandMacro, pila);
  }

  mapEval(binding) {
    return this.map(evalExpression.bind(binding));
  }

}

class EmptyList extends BubbleButt {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

function catchExpandMacro(o, bubbleButt, fn) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    bubbleButt.o  = expanded.first;
    bubbleButt.oo = bubbleButt.rest.conj(expanded.rest.invert());
    return bubbleButt.tryEach(fn, catchExpandMacro);
  } else {
    throw o;
  }
}

module.exports = BubbleButt;
