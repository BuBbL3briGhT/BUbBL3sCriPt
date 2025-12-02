constante crearEnlace = requerir("./crear_enlace");
constante Lista = requerir("./lista");

clase Macro {
  constructora
  (enlace, parámetros, cuerpo, opciones={}) {
    Objeto.asignar(esta, { enlace, parámetros,
      cuerpo, nombre }, opciones);
  }

  expandir(parámetros) {
    deja enlace = crearEnlace(esta.enlace,
      esta.parámetros, parámetros);

    vuelta esta.cuerpo.evaluaciónDeMapas(enlace);
  }

  // Esto es una suposición, pero parece correcto; se
  // necesitarán pruebas para confirmarlo. Tengo
  // cierta duda sobre por qué no es necesario
  // pasar la vinculación actual a la ex  pansión.
  // Puede que sea un descuido, y puede que sea
  // correcto tal como está.
  llamar(enlace, parámetros) {
    constante expandida = esta.expandir(parámetros);
    tirar nuevo MacroExpandida(expandida);
  }

  encordar() {
    vuelta "(macro " + esta.parámetros.encordar() +
      esta.cuerpo.encordar() + ")";
  }
}

clase MacroExpandida {
  constructora(expandida) {
    esta.expandida = expandida;
  }
}

módulo.exportaciones = { Macro, MacroExpandida };
