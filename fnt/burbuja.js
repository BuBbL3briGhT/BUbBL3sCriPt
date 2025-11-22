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

  inspect() {
    vuelta "°" + esta.o.inspect;
  }
}

module.exports = Burbuja;
