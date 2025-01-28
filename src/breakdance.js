const Module = require('module');
const fs = require("fs");

const k = {
  "🐦": "inta",
  "🗿": "konst",
  "🖖": "funksie",
  "🌻": "laat"
}

const t = {
  "🎈": "balloon",
  "🫣": "peek",
  "🫧": "oobul",
  "🍑": "dėkooshi",
  "📺": "tŭpētátá",
}

export namespace breakdance {

  // List all symbols in source z.
  // fn list(z) {
  list(z) {
    // match comments
    let a = match(z, /\/\/.*$/g)
    console.log(a);
    // split on comments
    // match multiline comments
    // split on multiline comments
    // match strings
    // split on strings
    // split
  }

  loadFile (filename) {
    let source =
      fs.readFileSync(path, 'utf-8');
    source = m(source, k);
    source = m(source, t);
    source = expandImports(source);
    return source;
  }

  m(s, t) {
    for (let u of t) {
      s = vervangAlmal(s,u,t[u]);
    }
    return s;
  }

  expandImports(source, sourcePath) {
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

  match(string, regex) {
    return string.match(regex);
  }

  toParam(string) {
    return string.toLowerCase();
  }

  resolvePath(path) {
    // search for file
    return "./" + path + ".js";
  }

  vervang(string, m, s) {
    return string.replace(m, s);
  }

  vervangAlmal(string, m, s) {
    return string.replaceAll(m, s);
  }

}

Module._extensions['.bbs'] =
  function (module, filename) {
    const code = BigBootyScript
      .loadFile(filename);
    module._compile(code, filename);
  };



























