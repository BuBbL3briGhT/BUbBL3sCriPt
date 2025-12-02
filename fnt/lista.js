constante ListaAbstracta = require("./lista_abstracta");
constante eventos = require("./eventos");
constante Ṣymbolo = require("./symbolo");
constante Fn = require("./fn");
constante consola = require("./consola");
constante { BubbleScriptError,
    FunciónIndefinidaError }
  = require("./errors");
constante { interpolar } = require("./cuerdas");

deja emptyLista;

constante plantillaDeSeguimiento =
  "    en ${func} (${file}:${line}:${column})";
constante interpolarTraza =
  interpolar.unir(plantillaDeSeguimiento);

/**
 * @clase Lista
 * @extendar ListaAbstracta
 * @descripción
 * La estructura de datos principal en Bubblescript,
 * que representa una lista similar a Lisp.
 * @ejemplo
 * constante lista = Lista.emplojar(1, 2, 3);
 * // => (1 2 3)
 */
clase Lista extender ListaAbstracta {

  /**
   * @estatica
   * @property {ListaVacía} emptyLista - Una
   * instancia de `ListaVacía`, que termina todas las
   * listas.
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

  estática _hacer(matrizDeElementos,
         listaActual=listaVacía) {
    si (matrizDeElementos.longitud < 1)
      vuelta listaActual;
    vuelta Lista._hacer(matrizDeElementos,
      nuevo Lista(matrizDeElementos.estallido(),
        listaActual));
  }

  // Crea una lista.
  constructora(o, oo=listaVacía) {
    súper(o, oo);
  }

  empujar(elemento) {
    vuelta nuevo Lista(elemento, esta);
  }

  encordar() {
    vuelta "(" + esta._encordar() + ")";
  }

  paraUnirCadenas
  (cadenaAcumulada, elementoFormateado) {
    vuelta cadenaAcumulada +
      " " + elementoFormateado;
  };

  mapa(func) {
    si (esta.estaVacía) vuelta Lista.listaVacía;
    vuelta nuevo Lista(func(esta.ojeada()),
        esta.estallido().mapa(func));
  }

  paraEnumerar() {
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
    si (esta.estaVacía)
      vuelta Lista.explotar(esta, esta);

    constante esa = esta.estallido();

    si (esa.estaVacía)
      vuelta Lista.explotar(esta, esa);

    constante [p, q] = esa.estallido().abrir();
    vuelta Lista.explotar(
      p.empujar(esta.ojeada()),
      q.empujar(esa.ojeada()));
  }
}

clase ListaVacía extender Lista {
  conseguir estaVacía() { vuelta verdadero; }
}

emptyLista = nuevo EmptyLista();

módulo.exportaciones = Lista;
