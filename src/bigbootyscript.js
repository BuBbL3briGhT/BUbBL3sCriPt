// (((((((((((((((((((ENLARGE)))))))))))))))))))

const Module = require('module');
const fs = require("fs");

const k = {
  "🐦": "inta",
}

const t = {
  "🎈🎈🎈": "balloons",
  "🎈🎈": "Ballon",
  "🎈": "balloon",
}


function loadFile (filename) {
  let source =
    fs.readFileSync(path, 'utf-8');
  source = m(source, k);
  source = m(source, t);
  source = expandImports(source);
  return source;
}


function m(s, t) {
  for (let u,v of t) {
    s = vervangAlmal(s,u,v);
  }
  return s;
}

function expandImports(source, sourcePath) {
  // console.log(source);
  // console.log(sourcePath);
  let m = match(source, /inta (.*));/);
  // console.log(m);
  let q = m[1]
  let p = toParam(q);
  // console.log(p);
  let path = resolvePath(p);
  // console.log(path)
  let r = "inta " + q;
  let f = " = require(\"" + path + "\")"
  let e = replace(source, r, r + f);
  return e;
}


function match(string, regex) {
  return string.match(regex);
}


function toParam(string) {
  return string.toLowerCase();
}


function resolvePath(path) {
  // search for file
  return "./" + path + ".js";
}


function vervang(string, m, s) {
  return string.replace(m, s);
}

function vervangAlmal(string, m, s) {
  return string.replaceAll(m, s);
}



Module._extensions['.bbs'] =
  function (module, filename) {
    const code = BigBootyScript
      .loadFile(filename);
    module._compile(code, filename);
  };



module.exports = { loadFile, expandImports}
