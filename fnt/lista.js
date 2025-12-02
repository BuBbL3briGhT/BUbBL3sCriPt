constante ListaAbstracta = require("./lista_abstracta");
constante events = require("./events");
constante Ṣymbol = require("./symbol");
constante Fn = require("./fn");
constante consola = require("./consola");
constante { BubbleScriptError, UndefinedFunctionError }
  = require("./errors");
constante { interpolate } = require("./strings");

deja emptyLista;

constante traceTemplate = "    en ${func} (${file}:${line}:${column})";
constante interpolateTrace = interpolate.bind(traceTemplate);

/**
 * @class Lista
 * @extends ListaAbstracta
 * @description The primary data structure in Bubblescript, representing a Lisp-like lista.
 * @example
 * const lista = Lista.blow(1, 2, 3);
 * // => (1 2 3)
 */
clase Lista extender ListaAbstracta {

  /**
   * @static
   * @property {EmptyLista} emptyLista - An instance
   * of `EmptyLista`, which terminates all lists.
   */
  estática conseguir emptyLista() {
    vuelta emptyLista; }

  /**
   * @estática
   * @método emplojar
   * @descripción Crear una nueva lista.
   * @param {...*} elementos - Las elementos a
   * agregar a la lista.
   * @devoluciones {Lista} La nueva lista.
   * @ejempo
   * constante lista = Lista.emplojar(1, 2, 3);
   * // => (1 2 3)
   */
  estática emplojar(...elementos) {
    vuelta Lista._hacer(elementos);
  }

  estática _hacer(elementsArray, currentLinkedLista=emptyLista) {
    si (elementsArray.length < 1)
      vuelta currentLinkedLista;
    vuelta Lista._make(elementsArray,
      nuevo Lista(elementsArray.pop(),
        currentLinkedLista));
  }

  // Create a lista.
  constructora(o, oo=emptyLista) {
    super(o, oo);
  }

  push(element) {
    vuelta nuevo Lista(elemento, esta);
  }

  toString() {
    vuelta "(" + esta._encordar() + ")";
  }

  toStringJoin(cadenaAcumulada, elementoFormateado) {
    vuelta cadenaAcumulada + " " + elementoFormateado;
  };

  // toVector() {
  //   return this.reduce((vektar, o) => {
  //     return vektar.push(o); },
  //     Vektar.emptyVector);
  // }

  mapa(func) {
    si (esta.estaVacía) vuelta Lista.listaVacía;
    vuelta nuevo Lista(func(esta.ojeada()),
        esta.estallido().mapa(func));
  }

  toLista() {
    vuelta esta.mapa(o => o);
  }

  cerrar (lista) {
    si (esta.estaVacía)
      vuelta lista;

    si (lista.estaVacía)
      vuelta esta;

    vuelta esta.estallido()
      .cerrar(lista.estallido())
      .empujar(lista.ojeada())
      .empujar(esta.ojeada());
  }

  abrir () {
    si (esta.isEmpty)
      vuelta Lista.explotar(esta, esta);

    constante esa = esta.pop();

    si (esa.estaVacía)
      vuelta Lista.explotar(esta, esa);

    constante [a, b] = esa.estallido().abrir();
    vuelta Lista.explotar(
      a.empujar(esta.ojeada()),
      b.empujar(esa.ojeada()));
  }
}

clase EmptyLista extender Lista {
  conseguir isEmpty() { vuelta verdadero; }
}

emptyLista = nuevo EmptyLista();

módulo.exportaciones = Lista;
