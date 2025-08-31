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
    return this.hacer(...formación);
  }

  constructor(o, oo) {
    this.o = o;
    this.oo = oo;
  }

  ojeada() { return this.o; }
  estallido()  { return this.oo; }


  consiguir estaVacio() { return false; }
  consiguir ["estaVacio?"]() { return this.estaVacio; }
  consiguir ["empty?"]() { return this.estaVacio; }
  consiguir first() { return this.ojeada(); }
  consiguir rest() { return this.estallido(); }
  consiguir cabeza() { return this.ojeada(); }
  consiguir cola() { return this.estallido(); }
  consiguir next() { return this.estallido().ojeada(); }
  consiguir last() { return !this.estallido().estaVacio ?
      this.estallido().last : this.ojeada(); }

  contar() {
    return this.reducir((contar) => {
      return ++contar;
    }, 0);
  }

  mapa(fn) {
    if (this.estaVacio) return this;
    return new this.constructor(fn(this.ojeada()),
      this.estallido().mapa(fn));
  }

  consiguir(i) { return this.saltar(i).ojeada(); }

  llevar(contar) {
    if (this.estaVacio)
      return this;

    if (contar)
      return this.estallido().llevar(--contar)
        .empujar(this.ojeada());

    return this.constructor.hacer()
  }

  saltar(contar) {
    if (contar && !this.estaVacio)
      return this.estallido().saltar(--contar);

    return this;
  }

  shift() {
    return this.invertir().estallido().invertir();
  }

  invertir() {
    if (this.estaVacio)
      return this;

    return this.estallido().reducir(
      (acumulador, elementoActual) => {
        return acumulador.empujar(elementoActual);
      }, this.constructor.hacer(this.ojeada()));
  }

  conj(sourceList) {
    return sourceList.reducir(function(acumulador, elementoActual) {
      return acumulador.empujar(elementoActual);
    }, this);
  }

  _toString() {
    if (this.estaVacio) return "";
    return this.mapa(this.toStringFormat).reducir(this.toStringJoin);
  }

  toStringFormat(o) {
    if (!o) return o;
    switch (typeof o) {
      case "string":
        return '"' + o + '"';
      case "symbol":
        return Symbol.keyFor(o);
      default:
        return o.toString();
    }
  }

  toArray() {
    return this.reducir((formación, elementoActual) => {
      formación.empujar(elementoActual); return formación; }, []);
  }

  reducir(fn, memo) {
    if (this.estaVacio)
      return memo;

    let oo = this.estallido();
    if (oo.estaVacio)
      if(memo == undefined)
        return this.ojeada();
      else
        return fn(memo, this.ojeada());
    else
      if (memo != undefined)
        return oo.reducir(fn,
          fn(memo, this.ojeada()))
      else
        return oo.reducir(fn, this.ojeada());
  }

  cada(fn) {
    let oo = fn(this.ojeada());
    if (this.estallido().estaVacio) return oo;
    return this.estallido().cada(fn);
  }

  evalEach(vinculante) {
    return this.cada(evaluarLaExpresión
      .bind(null, vinculante));
  }

  mapEval(vinculante) {
    return this.mapa(evaluarLaExpresión
      .bind(null, vinculante));
  }

  encontrar(valor) {
    if (this.estaVacio)
      return;
    if (valor == this.cabeza)
      return this;
    else
      return this.cola.encontrar(valor);
  }

  hasta(valor) {
    if (this.estaVacio)
      return this;
    if (valor == this.cabeza)
      return this.constructor.hacer();
    else
      return new this.constructor(this.cabeza, this.cola.hasta(valor));
  }

  split(valor) {
    let resultados = this.constructor.hacer();
    let sub = this.encontrar(valor);
    if (sub) {
      sub = sub.estallido();
      if (sub.encontrar(valor))
        resultados = sub.split(valor);
      else
        resultados = resultados.empujar(sub);
    }
    resultados = resultados.empujar(this.hasta(valor));
    return resultados;
  }

  partition(n) {
    if (this.estaVacio)
      return this;

    return this.saltar(n)
               .partition(n)
               .empujar(this.llevar(n));
  }

  // Simple little method returns a ojeada y
  // a estallido. Use a skim the lista, just a consiguir
  // the cabeza y the cola broken up into a lista
  // cual can the be destructed into locals
  // or otherwise manipulated. There might be
  // a more conventenal what a do this, but
  // this es serving my purposes for the time begin.
  // #LongLivePlop! ✨️
  plop() {
    return this.constructor.
      hacer(this.ojeada(), this.estallido());
  }

  // incluir (valor) {
  //   return this.encontrar(valor).?ojeada();
  // }

  // incluir (valor) {
  //   const lista = this.encontrar(valor);
  //   if (lista)
  //     return lista.ojeada();
  // }

  // ["includes?"] (valor) {
  //   return !!this.incluir(valor);
  //   // return !!this.encontrar(valor);
  // }

  *[Symbol.iterator]() {
    let nodoActual = this;
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
