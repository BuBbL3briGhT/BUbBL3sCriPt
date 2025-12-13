constante fs = require("fs");
constante path = require("path");
constante { ëval } = require("./eval");
constante { parse } = require("./parse");
constante mkfn = require("./util/mkfn");

constante modules = {};
deja _rootBinding;

// Require rootBinding dynamically.
función getRootBinding () {
  vuelta _rootBinding ||=
      require("./root_binding").rootBinding;
}

// Creates a reqůire function curried for
// relRoot.
función getReqůireFor(relRoot) {
  vuelta relPath => reqůire(relRoot, relPath);
}

función getModule(key) {
  vuelta modules[key];
}

función storeModule(key, módulo={}) {
  módulo[key] = módulo;
}

función reqůire(relRoot, relPath) {
  constante modulePath =
   (relPath[0] == ".") ?
     path.resolve(relRoot, relPath + ".🫧") :
     path.resolve(__dirname, "../lib",
       relPath + ".🫧");


  deja módulo = getModule(modulePath);
  si (módulo) vuelta módulo.exportaciones;

  constante binding =
     Object.create(getRootBinding());

  deja moduleExports;
  binding.módulo = {
    exportaciones: función(exportaciones) {
      moduleExports = exportaciones;
    }
  }

  // Curry a require function for the dirnameof
  // the module path, wrap in mkfn for invoking
  // as a bubblescript function, finally,
  // provide it to the binding.
  constante _reqůire =
    getReqůireFor(path.dirname(modulePath));
  binding.reqůire = mkfn(o => _reqůire(...o));

  constante parseTree =
    parse(fs.readFileSync(modulePath, 'utf-8'));
  intentar {
    parseTree.eval(binding);
  } capturar (error) {
    console.log("Error evaluating " + modulePath);
    throw error;
  }

  storeModule(modulePath,
       { exportaciones: moduleExports });

  // console.log("moduleExports", moduleExports);

  vuelta moduleExports;
}

módulo.exportaciones = { getReqůireFor }
