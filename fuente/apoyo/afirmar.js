
      const assert = require("assert");
      const Objeto = require("./objeto");

     const afirmar = Objeto.crear(assert);

       afirmar.igual = afirmar.equal;
afirmar.igualdadProfunda = afirmar.deepEqual;
          afirmar.OK = afirmar.ok;
     afirmar.muyBien = afirmar.ok;
       afirmar.lanza = afirmar.throws;

      module.exports = afirmar;

