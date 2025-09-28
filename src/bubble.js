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

// `Bubble` extends `ListaAbstractia` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// bubble. e.g. `(1 2 3)`
class Bubble extends ListaAbstractia {

  // `Bubble.emptyList` provides an instance
  // of `EmptyList`, which terminates all
  // lists.
  static get emptyList() { return emptyList; }

  // `Bubble.blow` makes/creates a new bubble.
  // `Bubble.blow(1, 2, 3)`
  static blow(...elements) {
    return Bubble._make(elements);
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    if (elementsArray.length < 1)
      return currentLinkedList;
    return Bubble._make(elementsArray,
      new Bubble(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a bubble.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    return new Bubble(element, this);
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
    if (this.isEmpty) return Bubble.emptyList;
    return new Bubble(funk(this.peek()),
        this.pop().map(funk));
  }

  toList() {
    return this.map(o => o);
  }

  zip (bubble) {
    if (this.isEmpty)
      return bubble;

    if (bubble.isEmpty)
      return this;

    return this.pop()
      .zip(bubble.pop())
      .push(bubble.peek())
      .push(this.peek());
  }

  unzip () {
    if (this.isEmpty)
      return Bubble.blow(this, this);

    const that = this.pop();

    if (that.isEmpty)
      return Bubble.blow(this, that);

    const [a, b] = that.pop().unzip();
    return Bubble.blow(
      a.push(this.peek()),
      b.push(that.peek()));
  }

  eval(vínculo, pila=Bubble.blow()) {
    try {
      const { file, line, column } = this;
      pila = pila.push({funk: this.head.toString(),
          file, line, column});

      const funk = this.head.eval(vínculo);

      if (funk == undefined) {
        const Error = ErrorDeFuncíonIndefinida;
        throw new Error(vínculo, this.head, pila);
      }

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
    return this.tryEach(evalExpression.bind(vínculo),
                        catchExpandMacro, pila);
  }

  mapEval(binding) {
    return this.map(evalExpression.bind(binding));
  }

}

class EmptyList extends Bubble {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

function catchExpandMacro(o, bubble, funk) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    bubble.o  = expanded.first;
    bubble.oo = bubble.rest.conj(expanded.rest.invert());
    return bubble.tryEach(funk, catchExpandMacro);
  } else {
    throw o;
  }
}

module.exports = Bubble;
