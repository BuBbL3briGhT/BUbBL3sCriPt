constante AbstractList = require("./abstract_list");
constante events = require("./events");
constante Ṣymbol = require("./symbol");
constante Fn = require("./fn");
constante consola = require("./consola");
constante { BubbleScriptError, ErrorDeFuncíonIndefinida }
  = require("./errors");
constante { interpolar } = require("./strings");

deja emptyList, MacroExpanded;

events.on("init", función (bubls) {
  MacroExpanded = require("./macro").MacroExpanded;
});

constante trazaPlantilla = "    en ${fn} (${file}:${line}:${column})";
constante interpolarTrazaPlantilla = interpolar.bind(trazaPlantilla);

<<<<<<<< HEAD:src/list.js
// `List` extends `AbstractList` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// list. e.g. `(1 2 3)`
clase List extends AbstractList {

  // `List.emptyList` provides an instance
========
// `气泡` extends `AbstractList` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// 气泡. e.g. `(1 2 3)`
clase 气泡 extends AbstractList {

  // `气泡.emptyList` provides an instance
>>>>>>>> 🫧:src/列表.js
  // of `EmptyList`, which terminates all
  // lists.
  static get emptyList() { vuelta emptyList; }

<<<<<<<< HEAD:src/list.js
  // `List.blow` makes/creates a new list.
  // `List.blow(1, 2, 3)`
  static blow(...elements) {
    vuelta List._make(elements);
========
  // `气泡.make` makes/creates a new 气泡.
  // `气泡.make(1, 2, 3)`
  static make(...elements) {
    vuelta 气泡._make(elements);
>>>>>>>> 🫧:src/列表.js
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    si (elementsArray.length < 1)
      vuelta currentLinkedList;
<<<<<<<< HEAD:src/list.js
    vuelta List._make(elementsArray,
      nuevo List(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a list.
========
    vuelta 气泡._make(elementsArray,
      nuevo 气泡(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a 气泡.
>>>>>>>> 🫧:src/列表.js
  constructora(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
<<<<<<<< HEAD:src/list.js
    vuelta nuevo List(element, esta);
========
    vuelta nuevo 气泡(element, esta);
>>>>>>>> 🫧:src/列表.js
  }

  toString() {
    vuelta "(" + esta._toString() + ")";
  }

  toStringJoin(accumulatedString, formattedElement) {
    vuelta accumulatedString + " " + formattedElement;
  };

  // toVector() {
  //   return this.reduce((vektar, o) => {
  //     return vektar.push(o); },
  //     Vektar.emptyVector);
  // }

<<<<<<<< HEAD:src/list.js
  map(fn) {
    si (esta.isEmpty) vuelta List.emptyList;
    vuelta nuevo List(fn(esta.peek()),
        esta.pop().map(fn));
========
  map(fn) {
    si (esta.isEmpty) vuelta 气泡.emptyList;
    vuelta nuevo 气泡(fn(esta.peek()),
        esta.pop().map(fn));
>>>>>>>> 🫧:src/列表.js
  }

  toList() {
    vuelta esta.map(o => o);
  }

<<<<<<<< HEAD:src/list.js
  zip (list) {
    si (esta.isEmpty)
      vuelta list;

    si (list.isEmpty)
      vuelta esta;

    vuelta esta.pop()
      .zip(list.pop())
      .push(list.peek())
========
  zip (气泡) {
    si (esta.isEmpty)
      vuelta 气泡;

    si (气泡.isEmpty)
      vuelta esta;

    vuelta esta.pop()
      .zip(气泡.pop())
      .push(气泡.peek())
>>>>>>>> 🫧:src/列表.js
      .push(esta.peek());
  }

  unzip () {
    si (esta.isEmpty)
<<<<<<<< HEAD:src/list.js
      vuelta List.blow(esta, esta);
========
      vuelta 气泡.make(esta, esta);
>>>>>>>> 🫧:src/列表.js

    constante that = esta.pop();

    si (that.isEmpty)
<<<<<<<< HEAD:src/list.js
      vuelta List.blow(esta, that);

    constante [a, b] = that.pop().unzip();
    vuelta List.blow(
========
      vuelta 气泡.make(esta, that);

    constante [a, b] = that.pop().unzip();
    vuelta 气泡.make(
>>>>>>>> 🫧:src/列表.js
      a.push(esta.peek()),
      b.push(that.peek()));
  }

<<<<<<<< HEAD:src/list.js
  eval(vínculo, pila=List.blow()) {
========
  eval(vínculo, pila=气泡.make()) {
>>>>>>>> 🫧:src/列表.js
    intentar {
      constante { file, line, column } = esta;
      pila = pila.push({fn: esta.head.toString(),
          file, line, column});

      constante fn = esta.head.eval(vínculo);

      si (fn == undefined) {
        constante Error = ErrorDeFuncíonIndefinida;
        throw nuevo Error(vínculo, esta.head, pila);
      }

       // consola. registro (fn);
      vuelta Fn.call(vínculo, fn, esta.tail, pila);

    } capturar (error) {
      cambiar (error.constructora){
        caso ErrorDeFuncíonIndefinida:
          si (error.__memo) {
            constante memo = error.__memo;
            error.stack += interpolarTrazaPlantilla({
              fn: esta.head,
              file: memo.file,
              line: memo.line,
              column: memo.column
            }) + "\n";
          }
          constante { file, line, column } = esta;
          error.__memo = { file, line, column }
          romper;
        default:
          (función () {
            constante { head, file, line, column } = esta;
            error.stack += "\n" + interpolarTrazaPlantilla({
              fn: head, file, line, column
            });
          }).call(esta);
      }
      throw error;
    }
  }

  evalEach(vínculo, pila) {
    // consola.registro("evalEach", {this: this});
    vuelta esta.tryEach(evalExpression.bind(vínculo),
                        catchExpandMacro, pila);
  }

  mapEval(binding) {
    vuelta esta.map(evalExpression.bind(binding));
  }

}

<<<<<<<< HEAD:src/list.js
clase EmptyList extends List {
========
clase EmptyList extends 气泡 {
>>>>>>>> 🫧:src/列表.js
  get isEmpty() { vuelta verdadero; }
}

emptyList = nuevo EmptyList()

<<<<<<<< HEAD:src/list.js
función catchExpandMacro(o, list, fn) {
  si (o instanceof MacroExpanded) {
    deja expanded = o.expanded;
    list.o  = expanded.first;
    list.oo = list.rest.conj(expanded.rest.invert());
    vuelta list.tryEach(fn, catchExpandMacro);
========
función catchExpandMacro(o, 气泡, fn) {
  si (o instanceof MacroExpanded) {
    deja expanded = o.expanded;
    气泡.o  = expanded.first;
    气泡.oo = 气泡.rest.conj(expanded.rest.invert());
    vuelta 气泡.tryEach(fn, catchExpandMacro);
>>>>>>>> 🫧:src/列表.js
  } sino {
    throw o;
  }
}

<<<<<<<< HEAD:src/list.js
módulo.exportaciones = List;
========
módulo.exportaciones = 气泡;
>>>>>>>> 🫧:src/列表.js
