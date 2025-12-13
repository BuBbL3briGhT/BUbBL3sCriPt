constante Lista = require("./lista");

clase ListaDePerezosos extiende Lista {

  conseguir listaVacía () { vuelta Lista.listaVacía }

  constructora (itty) {

    si (!itty.próxima) {
      // Comprueba si itty es iterable.
      si (itty[Symbolo.iterador]) {
        // Si se llama al método iterador para
        // obtener el iterador.
        itty = itty[Símbolo.iterador]();

        // Una comprobación final para asegurarnos de
        // que obtuvimos un iterador del método
        // iterador.
        si (!itty.próxima)
          tirar nuevo Error("El método iterador " +
            "devolvió un objeto que no es un " +
            "iterador: "
            + { itty });

      } sino {
        // Si no es un iterador ni iterable (tiene
        // una función Símbolo.iterator), genera un
        // error.
        tirar nuevo Error(`El primer parámetro no \
          es un iterador ni iterable:` + { itty });
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
