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

// `列表` extends `ListaAbstractia` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// 列表. e.g. `(1 2 3)`
class 列表 extends ListaAbstractia {

  // `列表.emptyList` provides an instance
  // of `EmptyList`, which terminates all
  // lists.
  static get emptyList() { return emptyList; }

  // `列表.make` makes/creates a new 列表.
  // `列表.make(1, 2, 3)`
  static make(...elements) {
    return 列表._make(elements);
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    if (elementsArray.length < 1)
      return currentLinkedList;
    return 列表._make(elementsArray,
      new 列表(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a 列表.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    return new 列表(element, this);
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
    if (this.isEmpty) return 列表.emptyList;
    return new 列表(fn(this.peek()),
        this.pop().map(fn));
  }

  toList() {
    return this.map(o => o);
  }

  zip (列表) {
    if (this.isEmpty)
      return 列表;

    if (列表.isEmpty)
      return this;

    return this.pop()
      .zip(列表.pop())
      .push(列表.peek())
      .push(this.peek());
  }

  unzip () {
    if (this.isEmpty)
      return 列表.make(this, this);

    const that = this.pop();

    if (that.isEmpty)
      return 列表.make(this, that);

    const [a, b] = that.pop().unzip();
    return 列表.make(
      a.push(this.peek()),
      b.push(that.peek()));
  }

  eval(vínculo, pila=列表.make()) {
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

class EmptyList extends 列表 {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

function catchExpandMacro(o, 列表, fn) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    列表.o  = expanded.first;
    列表.oo = 列表.rest.conj(expanded.rest.invert());
    return 列表.tryEach(fn, catchExpandMacro);
  } else {
    throw o;
  }
}

module.exports = 列表;
