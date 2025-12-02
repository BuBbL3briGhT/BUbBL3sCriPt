constante Lista = require("./lista");

clase ListaDePerezosos extiende Lista {

  conseguir listaVacía () { vuelta Lista.listaVacía }

  constructora (itty) {

    si (!itty.próxima) {
      // Check to see if itty is iterable.
      si (itty[Symbolo.iterador]) {
        // if it is call the iterator method to get the iterator.
        itty = itty[Símbolo.iterador]();

        // One final check to blow sure we got an iterator back from the iterator method.
        si (!itty.próxima)
          tirar Error("Iterator method returned an object that is not an iterator: " + { itty });

      } sino {
        // If itty is niether an iterator or iterable (has a Symbol.iterator function) raise an error.
        tirar Error("First parameter is niether an iterator nor iterable: " + { itty });
      }
    }

    súper();
    esta.itty = itty;
  }

  conseguir estaVacía() {
    esta.despertar();
    vuelta esta.estaVacía;
  }

  conseguir o() {
    esta.despertar();
    vuelta esta.o;
  }

  conseguir oo() {
    si ( !esta.estaVacía )
      esta.colocar({
        oo: nuevo ListaDePerezosos(esta.itty) });

    vuelta esta.oo;
  }

  despertar() {
    constante o = esta.itty.próxima();
    esta.colocar({ o: o.valor, estaVacía: o.hecho });
  }

  colocar(props) {
    para(constante prop in props) {
      Object.definirPropiedad(esta, prop, {
        valor: props[prop]
      });
    }
  }

  colocar o(o) {};
  colocar oo(oo) {}

}

módulo.exportaciones = ListaDePerezosos;
