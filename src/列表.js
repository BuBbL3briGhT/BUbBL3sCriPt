const ListaAbstractia = require("./lista_abstractia");
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

// `气泡` extends `ListaAbstractia` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// 气泡. e.g. `(1 2 3)`
class 气泡 extends ListaAbstractia {

  // `气泡.emptyList` provides an instance
  // of `EmptyList`, which terminates all
  // lists.
  static get emptyList() { return emptyList; }

  // `气泡.make` makes/creates a new 气泡.
  // `气泡.make(1, 2, 3)`
  static make(...elements) {
    return 气泡._make(elements);
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    if (elementsArray.length < 1)
      return currentLinkedList;
    return 气泡._make(elementsArray,
      new 气泡(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a 气泡.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    return new 气泡(element, this);
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
    if (this.isEmpty) return 气泡.emptyList;
    return new 气泡(fn(this.peek()),
        this.pop().map(fn));
  }

  toList() {
    return this.map(o => o);
  }

  zip (气泡) {
    if (this.isEmpty)
      return 气泡;

    if (气泡.isEmpty)
      return this;

    return this.pop()
      .zip(气泡.pop())
      .push(气泡.peek())
      .push(this.peek());
  }

  unzip () {
    if (this.isEmpty)
      return 气泡.make(this, this);

    const that = this.pop();

    if (that.isEmpty)
      return 气泡.make(this, that);

    const [a, b] = that.pop().unzip();
    return 气泡.make(
      a.push(this.peek()),
      b.push(that.peek()));
  }

  eval(vínculo, pila=气泡.make()) {
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

class EmptyList extends 气泡 {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

function catchExpandMacro(o, 气泡, fn) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    气泡.o  = expanded.first;
    气泡.oo = 气泡.rest.conj(expanded.rest.invert());
    return 气泡.tryEach(fn, catchExpandMacro);
  } else {
    throw o;
  }
}

module.exports = 气泡;
