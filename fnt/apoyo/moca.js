
       const Mocha = require("mocha");
      const Objeto = require("./objeto");
     const consola = require("./consola");

        const Moca = Objeto.crear(Mocha);

         // const ella = Objeto.crear(Moca.it);
    // const describir = Objeto.crear(Moca.describe);
         const ella = (...params) => Mocha.it(...params);
    const describir = (...params) => Mocha.describe(...params);

    ella.saltar = Mocha.it.skip;
      ella.sola = Mocha.it.only;
      ella.solo = Mocha.it.only;

    describir.saltar = Mocha.describe.skip;
      describir.sola = Mocha.describe.only;
      describir.solo = Mocha.describe.only;

    Objeto.asignar(Moca, { ella, describir });

      module.exports = Moca;


