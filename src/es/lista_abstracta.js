const eventos = requerir("./eventos");

dejar ëval;

eventos.en("inicio", función (bubls) {
  ëval = bubls.ëval;
  evaluarLaExpresión = bubls.evaluarLaExpresión;
});


// Dejar's definir `ListaAbstracta` cual es a
// clase esa voluntad atender como la abstracta
// base clase para `Lista` y `Vector`. Toda
// compartida funcionalidad entre `Lista` y
// `Vector` es centralizada aquí.
clase ListaAbstracta {

  estática de(matrizComo, mapaFn, estaArg) {
    dejar formación = Formación.de(matrizComo, mapaFn, estaArg);
    devolver esta.hacer(...formación);
  }

  constructora(o, oo) {
    esta.o = o;
    esta.oo = oo;
  }

  ojeada() { devolver esta.o; }
  estallido()  { devolver esta.oo; }


  consiguir estaVacio() { devolver falsa; }
  consiguir ["estaVacio?"]() { devolver esta.estaVacio; }
  consiguir ["vacía?"]() { devolver esta.estaVacio; }
  consiguir premera() { devolver esta.ojeada(); }
  consiguir descansar() { devolver esta.estallido(); }
  consiguir cabeza() { devolver esta.ojeada(); }
  consiguir cola() { devolver esta.estallido(); }
  consiguir próxima() { devolver esta.estallido().ojeada(); }
  consiguir última() { devolver !esta.estallido().estaVacio ?
      esta.estallido().última : esta.ojeada(); }

  contar() {
    devolver esta.reducir((contar) => {
      devolver ++contar;
    }, 0);
  }

  mapa(fn) {
    si (esta.estaVacio) devolver esta;
    devolver nueva esta.constructora(fn(esta.ojeada()),
      esta.estallido().mapa(fn));
  }

  consiguir(i) { devolver esta.saltar(i).ojeada(); }

  llevar(contar) {
    si (esta.estaVacio)
      devolver esta;

    si (contar)
      devolver esta.estallido().llevar(--contar)
        .empujar(esta.ojeada());

    devolver esta.constructora.hacer()
  }

  saltar(contar) {
    si (contar && !esta.estaVacio)
      devolver esta.estallido().saltar(--contar);

    devolver esta;
  }

  cambio() {
    devolver esta.invertir().estallido().invertir();
  }

  invertir() {
    si (esta.estaVacio)
      devolver esta;

    devolver esta.estallido().reducir(
      (acumulador, elementoActual) => {
        devolver acumulador.empujar(elementoActual);
      }, esta.constructora.hacer(esta.ojeada()));
  }

  unir(listaDeFuentes) {
    devolver listaDeFuentes.reducir(función(acumulador, elementoActual) {
      devolver acumulador.empujar(elementoActual);
    }, esta);
  }

  _encordar() {
    si (esta.estaVacio) devolver "";
    devolver esta.mapa(esta.alFormatoDeCadena).reducir(esta.paraUnirCuerdas);
  }

  alFormatoDeCadena(o) {
    si (!o) devolver o;
    cambiar (tipode o) {
      caso "cadena":
        devolver '"' + o + '"';
      caso "símbolo":
        devolver Símbolo.clavePara(o);
      porDefecto:
        devolver o.encodar();
    }
  }

  formaUnaMatriz() {
    devolver esta.reducir((formación, elementoActual) => {
      formación.empujar(elementoActual); devolver formación; }, []);
  }

  reducir(fn, memo) {
    si (esta.estaVacio)
      devolver memo;

    dejar oo = esta.estallido();
    si (oo.estaVacio)
      si(memo == indefinida)
        devolver esta.ojeada();
      demás
        devolver fn(memo, esta.ojeada());
    demás
      si (memo != indefinida)
        devolver oo.reducir(fn,
          fn(memo, esta.ojeada()))
      demás
        devolver oo.reducir(fn, esta.ojeada());
  }

  cada(fn) {
    dejar oo = fn(esta.ojeada());
    si (esta.estallido().estaVacio) devolver oo;
    devolver esta.estallido().cada(fn);
  }

  evaluarCadaUno(vinculante) {
    devolver esta.cada(evaluarLaExpresión
      .unir(nula, vinculante));
  }

  evaluaciónDMapa(vinculante) {
    devolver esta.mapa(evaluarLaExpresión
      .unir(nula, vinculante));
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
      devolver esta.constructora.hacer();
    demás
      devolver nueva esta.constructora(esta.cabeza, esta.cola.hasta(valor));
  }

  dividir(valor) {
    dejar resultados = esta.constructora.hacer();
    dejar sus = esta.encontrar(valor);
    si (sus) {
      sus = sus.estallido();
      si (sus.encontrar(valor))
        resultados = sus.dividir(valor);
      demás
        resultados = resultados.empujar(sus);
    }
    resultados = resultados.empujar(esta.hasta(valor));
    devolver resultados;
  }

  repartirPara(n) {
    si (esta.estaVacio)
      devolver esta;

    devolver esta.saltar(n)
               .repartirPara(n)
               .empujar(esta.llevar(n));
  }

  // Sencilla pequeña método regresa a ojeada y
  // a estallido. usar a desnatar la lista, justa a consiguir
  // la cabeza y la cola rota arriba en a lista
  // cual poder la ser destruida en lugareños
  // o de la contrario manipulada. Allá podría ser
  // a más conventenal qué a hacer esta, pero
  // esta es servicio mi propósitos para la tiempo comenzar.
  // #LargaVidaAlPlop! ✨️
  plaf() {
    devolver esta.constructora.
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

  // ["incluye?"] (valor) {
  //   devolver !!esta.incluir(valor);
  //   // devolver !!esta.encontrar(valor);
  // }

  *[Símbolo.itarador]() {
    dejar nodoActual = esta;
    mientras (!nodoActual.estaVacio) {
      producir nodoActual.o;
      nodoActual = nodoActual.oo;
    }
  }
}

// Alias
const prototipo = ListaAbstracta.prototipo;
prototipo["incluye?"] = prototipo.encontrar;

módulo.exportaciones = ListaAbstracta;
