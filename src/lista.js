const ListaAbstractia = require("./lista_abstractia");
const events = require("./events");
const Ṣymbol = require("./symbol");
const Funk = require("./funk");
const consola = require("./consola");
const { BubbleScriptError, ErrorDeFuncíonIndefinida }
  = require("./errors");
const { interpolar } = require("./strings");

let emptyList, MacroExpanded;

events.on("init", function (bubls) {
  MacroExpanded = require("./macro").MacroExpanded;
});

const trazaPlantilla = "    en ${funk} (${file}:${line}:${column})";
const interpolarTrazaPlantilla = interpolar.bind(trazaPlantilla);

// `Lista` extends `ListaAbstractia` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// lista. e.g. `(1 2 3)`
class Lista extends ListaAbstractia {

  // `Lista.emptyList` provides an instance
  // of `EmptyList`, which terminates all
  // lists.
  static get emptyList() { return emptyList; }

  // `Lista.blow` makes/creates a new lista.
  // `Lista.blow(1, 2, 3)`
  static blow(...elements) {
    return Lista._make(elements);
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    if (elementsArray.length < 1)
      return currentLinkedList;
    return Lista._make(elementsArray,
      new Lista(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a lista.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    return new Lista(element, this);
  }

  toString() {
    return "(" + this._toString() + ")";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return accumulatedString + " " + formattedElement;
  };

  // toVector() {
  //   return this.reduce((vektar, o) => {
  //     return vektar.push(o); },
  //     Vektar.emptyVector);
  // }

  map(funk) {
    if (this.isEmpty) return Lista.emptyList;
    return new Lista(funk(this.peek()),
        this.pop().map(funk));
  }

  toList() {
    return this.map(o => o);
  }

  zip (lista) {
    if (this.isEmpty)
      return lista;

    if (lista.isEmpty)
      return this;

    return this.pop()
      .zip(lista.pop())
      .push(lista.peek())
      .push(this.peek());
  }

  unzip () {
    if (this.isEmpty)
      return Lista.blow(this, this);

    const that = this.pop();

    if (that.isEmpty)
      return Lista.blow(this, that);

    const [a, b] = that.pop().unzip();
    return Lista.blow(
      a.push(this.peek()),
      b.push(that.peek()));
  }

  eval(vínculo, pila=Lista.blow()) {
    try {
      const { file, line, column } = this;
      pila = pila.push({funk: this.head.toString(),
          file, line, column});

      const funk = this.head.eval(vínculo);

      if (funk == undefined) {
        const Error = ErrorDeFuncíonIndefinida;
        throw new Error(vínculo, this.head, pila);
      }

       // consola. registro (funk);
      return Funk.call(vínculo, funk, this.tail, pila);

    } catch (error) {
      switch (error.constructor){
        case ErrorDeFuncíonIndefinida:
          if (error.__memo) {
            const memo = error.__memo;
            error.stack += interpolarTrazaPlantilla({
              funk: this.head,
              file: memo.file,
              line: memo.line,
              column: memo.column
            }) + "\n";
          }
          const { file, line, column } = this;
          error.__memo = { file, line, column }
          break;
        default:
          (function () {
            const { head, file, line, column } = this;
            error.stack += "\n" + interpolarTrazaPlantilla({
              funk: head, file, line, column
            });
          }).call(this);
      }
      throw error;
    }
  }

  evalEach(vínculo, pila) {
    // consola.registro("evalEach", {this: this});
    return this.tryEach(evalExpression.bind(vínculo),
                        catchExpandMacro, pila);
  }

  mapEval(binding) {
    return this.map(evalExpression.bind(binding));
  }

}

class EmptyList extends Lista {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

function catchExpandMacro(o, lista, funk) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    lista.o  = expanded.first;
    lista.oo = lista.rest.conj(expanded.rest.invert());
    return lista.tryEach(funk, catchExpandMacro);
  } else {
    throw o;
  }
}

module.exports = Lista;
