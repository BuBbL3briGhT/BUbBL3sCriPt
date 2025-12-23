import fs from "fs";
import path from "path";
import { parse } from "./parse.js";
// const mkfn = require("./util/mkfn");

const modules = {};
let _rootBinding;

// Require rootBinding dynamically.
function getRootBinding () {
  return _rootBinding ||=
      require("./root_binding").rootBinding;
}

// Creates a reqůire function curried for
// relRoot.
export function getReqůireFor(relRoot) {
  return relPath => reqůire(relRoot, relPath);
}

function getModule(key) {
  return modules[key];
}

function storeModule(key, module={}) {
  module[key] = module;
}

function reqůire(relRoot, relPath) {
  const modulePath =
   (relPath[0] == ".") ?
     path.resolve(relRoot, relPath + ".🫧") :
     path.resolve(__dirname, "../lib",
       relPath + ".🫧");


  let module = getModule(modulePath);
  if (module) return module.exports;

  const binding =
     Object.create(getRootBinding());

  let moduleExports;
  binding.module = {
    exports: function(exports) {
      moduleExports = exports;
    }
  }

  // Curry a require function for the dirnameof
  // the module path, wrap in mkfn for invoking
  // as a bubblescript function, finally,
  // provide it to the binding.
  const _reqůire =
    getReqůireFor(path.dirname(modulePath));
  binding.reqůire = mkfn(o => _reqůire(...o));

  const parseTree =
    parse(fs.readFileSync(modulePath, 'utf-8'));
  try {
    parseTree.eval(binding);
  } catch (error) {
    console.log("Error evaluating " + modulePath);
    throw error;
  }

  storeModule(modulePath,
       { exports: moduleExports });

  // console.log("moduleExports", moduleExports);

  return moduleExports;
}
