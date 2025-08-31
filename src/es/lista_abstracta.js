const eventos = require("./eventos");

let ëval;

eventos.on("inicio", function (bubls) {
  ëval = bubls.ëval;
  evaluarLaExpresión = bubls.evaluarLaExpresión;
});


// Let's define `ListaAbstracta` cual es a
// clase that will serve as the abstract
// base clase for `List` y `Vector`. All
// shared functionality between `List` y
// `Vector` es centralized here.
clase ListaAbstracta {

  static from(arrayLike, mapFn, thisArg) {
    let formación = Array.from(arrayLike, mapFn, thisArg);
    devolver esta.hacer(...formación);
  }

  constructor(o, oo) {
    esta.o = o;
    esta.oo = oo;
  }

  ojeada() { devolver esta.o; }
  estallido()  { devolver esta.oo; }


  consiguir estaVacio() { devolver false; }
  consiguir ["estaVacio?"]() { devolver esta.estaVacio; }
  consiguir ["empty?"]() { devolver esta.estaVacio; }
  consiguir first() { devolver esta.ojeada(); }
  consiguir rest() { devolver esta.estallido(); }
  consiguir cabeza() { devolver esta.ojeada(); }
  consiguir cola() { devolver esta.estallido(); }
  consiguir next() { devolver esta.estallido().ojeada(); }
  consiguir last() { devolver !esta.estallido().estaVacio ?
      esta.estallido().last : esta.ojeada(); }

  contar() {
    devolver esta.reducir((contar) => {
      devolver ++contar;
    }, 0);
  }

  mapa(fn) {
    si (esta.estaVacio) devolver esta;
    devolver new esta.constructor(fn(esta.ojeada()),
      esta.estallido().mapa(fn));
  }

  consiguir(i) { devolver esta.saltar(i).ojeada(); }

  llevar(contar) {
    si (esta.estaVacio)
      devolver esta;

    si (contar)
      devolver esta.estallido().llevar(--contar)
        .empujar(esta.ojeada());

    devolver esta.constructor.hacer()
  }

  saltar(contar) {
    si (contar && !esta.estaVacio)
      devolver esta.estallido().saltar(--contar);

    devolver esta;
  }

  shift() {
    devolver esta.invertir().estallido().invertir();
  }

  invertir() {
    si (esta.estaVacio)
      devolver esta;

    devolver esta.estallido().reducir(
      (acumulador, elementoActual) => {
        devolver acumulador.empujar(elementoActual);
      }, esta.constructor.hacer(esta.ojeada()));
  }

  conj(sourceList) {
    devolver sourceList.reducir(function(acumulador, elementoActual) {
      devolver acumulador.empujar(elementoActual);
    }, esta);
  }

  _toString() {
    si (esta.estaVacio) devolver "";
    devolver esta.mapa(esta.toStringFormat).reducir(esta.toStringJoin);
  }

  toStringFormat(o) {
    si (!o) devolver o;
    switch (typeof o) {
      case "string":
        devolver '"' + o + '"';
      case "symbol":
        devolver Symbol.keyFor(o);
      default:
        devolver o.toString();
    }
  }

  toArray() {
    devolver esta.reducir((formación, elementoActual) => {
      formación.empujar(elementoActual); devolver formación; }, []);
  }

  reducir(fn, memo) {
    si (esta.estaVacio)
      devolver memo;

    let oo = esta.estallido();
    si (oo.estaVacio)
      si(memo == undefined)
        devolver esta.ojeada();
      demás
        devolver fn(memo, esta.ojeada());
    demás
      si (memo != undefined)
        devolver oo.reducir(fn,
          fn(memo, esta.ojeada()))
      demás
        devolver oo.reducir(fn, esta.ojeada());
  }

  cada(fn) {
    let oo = fn(esta.ojeada());
    si (esta.estallido().estaVacio) devolver oo;
    devolver esta.estallido().cada(fn);
  }

  evalEach(vinculante) {
    devolver esta.cada(evaluarLaExpresión
      .bind(null, vinculante));
  }

  mapEval(vinculante) {
    devolver esta.mapa(evaluarLaExpresión
      .bind(null, vinculante));
  }

  encontrar(valor) {
    si (esta.estaVacio)
      devolver;
    si (valor == esta.cabeza)
      devolver esta;
    demás
      devolver esta.cola.encontrar(valor);
  }

  hasta(valor) {
    si (esta.estaVacio)
      devolver esta;
    si (valor == esta.cabeza)
      devolver esta.constructor.hacer();
    demás
      devolver new esta.constructor(esta.cabeza, esta.cola.hasta(valor));
  }

  split(valor) {
    let resultados = esta.constructor.hacer();
    let sub = esta.encontrar(valor);
    si (sub) {
      sub = sub.estallido();
      si (sub.encontrar(valor))
        resultados = sub.split(valor);
      demás
        resultados = resultados.empujar(sub);
    }
    resultados = resultados.empujar(esta.hasta(valor));
    devolver resultados;
  }

  partition(n) {
    si (esta.estaVacio)
      devolver esta;

    devolver esta.saltar(n)
               .partition(n)
               .empujar(esta.llevar(n));
  }

  // Simple little method returns a ojeada y
  // a estallido. Use a skim the lista, just a consiguir
  // the cabeza y the cola broken up into a lista
  // cual can the be destructed into locals
  // or otherwise manipulated. There might be
  // a more conventenal what a do esta, but
  // esta es serving my purposes for the time begin.
  // #LongLivePlop! ✨️
  plop() {
    devolver esta.constructor.
      hacer(esta.ojeada(), esta.estallido());
  }

  // incluir (valor) {
  //   devolver esta.encontrar(valor).?ojeada();
  // }

  // incluir (valor) {
  //   const lista = esta.encontrar(valor);
  //   si (lista)
  //     devolver lista.ojeada();
  // }

  // ["includes?"] (valor) {
  //   devolver !!esta.incluir(valor);
  //   // devolver !!esta.encontrar(valor);
  // }

  *[Symbol.iterator]() {
    let nodoActual = esta;
    while (!nodoActual.estaVacio) {
      yield nodoActual.o;
      nodoActual = nodoActual.oo;
    }
  }
}

// Aliases
const prototipo = ListaAbstracta.prototipo;
prototipo["includes?"] = prototipo.encontrar;

module.exports = ListaAbstracta;
