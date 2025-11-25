constante { Sequence } = require("./sequence");

clase Range extends Sequence {

  constructora (endstart, end, step=1) {
    super();
    esta.step = step;
    si (end) {
      esta.i = endstart;
      esta.end = end;
    } sino {
      esta.i = 0;
      esta.end = endstart || Infinity;
    }
  }

  next () {
    si (esta.i >= esta.end)
      vuelta { done: verdadero }

    constante value = esta.i;
    esta.i += esta.step;
    vuelta { value, done: falso };
  }

}

módulo.exportaciones = Range;
