import fs from "fs";
import path from "path";
import { parse } from "./parse.js";
import { evalEach } from "./eval.js";
import { specialForm } from "./special_form.js";

const modules = Object.create(null);

// Creates a reqůire function curried for
// relRoot.
export function getReqůireFor(binding, relRoot) {
  return reqůire.bind(null, binding, relRoot);
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
     path.resolve(import.meta.dirname, "../lib",
       relPath + ".🫧");

  const module = getModule(modulePath);
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
    getReqůireFor(binding, path.dirname(modulePath));
  binding.require = specialForm(o => _reqůire(...o));

  const parseTree =
    parse(fs.readFileSync(modulePath, 'utf-8'));
  try {
    evalEach(binding, parseTree);
  } catch (error) {
    console.log("Error evaluating " + modulePath);
    throw error;
  }

  storeModule(modulePath,
       { exports: moduleExports });

  return moduleExports;
}
