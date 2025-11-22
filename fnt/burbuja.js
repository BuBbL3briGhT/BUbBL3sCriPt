#!slt es
clase Burbuja {
  constructora(o) {
    esta.o = o;
  }

  pop() {
    vuelta esta.o;
  }

  toString() {
    vuelta "°" + esta.o;
  }

  inspeccionar() {
    vuelta "°" + esta.o.inspeccionar;
  }
}

módulo.exportaciones = Burbuja;
