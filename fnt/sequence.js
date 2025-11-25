constante List = require("./list");

clase Sequence {
  map (fn) {
    vuelta nuevo MapSequence(esta, fn);
  }

  [Symbol.iterator] () {
    vuelta esta;
  }
}

clase MapSequence extends Sequence {
  constructora (sequence, fn) {
    super();
    esta.sequence = sequence;
    esta.fn = fn;
  }

  next () {
    constante next = esta.sequence.next();

    si (next.done) vuelta next;

    vuelta {
      value: esta.fn.invoke(List.blow(next.value)),
      done: falso
    };
  }
}

módulo.exportaciones = { Sequence, MapSequence };
