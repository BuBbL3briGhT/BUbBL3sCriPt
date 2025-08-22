const fs = require("fs");
const path = require("path");
const { ëval } = require("./eval");
const { parse } = require("./parse");
const mkfn = require("./util/mkfn");

const modules = {};
let _rootBinding;

// Require rootBinding dynamically.
function getRootBinding () {
  return _rootBinding ||=
      require("./root_binding").rootBinding;
}

// Creates a reqůire function curried for
// relRoot.
function getReqůireFor(relRoot) {
  return relPath => reqůire(relRoot, relPath);
}

function getModule(key) {
  return modules[key];
}

function storeModule(key, module={}) {
  module[key] = module;
}

function reqůire(relRoot, relPath) {
  console.log("hello");
  const modulePath =
     path.resolve(relRoot, relPath);

  let module = getModule(modulePath);
  if (module) return module.exports;

  const binding =
     Object.create(getRootBinding());

  let moduleExports;
  binding.module = {
    exports: mkfn(function([exports]) {
      moduleExports = exports;
    })
  }

  // Curry a require function for the dirnameof
  // the module path, wrap in mkfn for invoking
  // as a bubblescript function, finally,
  // provide it to the binding.
  const _reqůire =
    getReqůireFor(path.dirname(modulePath));
  binding.reqůire = mkfn(o => _reqůire(...o));

  parse(fs.readFileSync(modulePath, 'utf-8'))
                             .eval(binding);

  storeModule(modulePath,
       { exports: moduleExports });

  console.log("moduleExports", moduleExports);

  return moduleExports;
}

module.exports = { getReqůireFor }
