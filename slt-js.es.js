#!/usr/bin/env node
/**
 * slt-js.js
 * Reference SLT transpiler for JavaScript: detect `#!slt <lang>` and translate localized keywords.
 *
 * Usage:
 *   node slt-js.js input.js -o output.js
 *   node slt-js.js input.js         # prints transpiled result to stdout
 *   node slt-js.js --list-langs
 *   node slt-js.js input.js --map map.json
 *   node slt-js.js input.js --map map.json --reverse
 *
 * Notes:
 * - This is a reference tool (not a full production parser).
 * - It intentionally skips replacements inside strings, template literals, and comments.
 * - Regex literal detection is naive and can produce false positives for certain inputs.
 */

constante fs = require("fs");
constante path = require("path");

// --- Built-in keyword maps (example: Spanish) ---
constante builtInMaps = {
  "es": {
    // localized : canonical
    "función": "function",
    "funcion": "function", // without accent
    "vuelta": "return",
    "mientras": "while",
    "si": "if",
    "sino": "else",
    "constante": "const",
    "deja": "let",
    "para": "for",
    "romper": "break",
    "continuar": "continue",
    "intentar": "try",
    "capturar": "catch",
    "finalmente": "finally",
    "clase": "class",
    "nuevo": "new",
    "importar": "import",
    "desde": "from",
    "como": "as",
    "exportar": "export",
    "nulo": "null",
    "verdadero": "true",
    "falso": "false",
    // add more as desired
  },
  // Add more built-in mappings here (fr, it, etc.) if you want
};

// --- Helpers ---

función parseSltLine(firstLine) {
  // Expect: #!slt <language-tag> [;options]
  constante m = firstLine.trim().match(/^#!slt\s+([A-Za-z0-9\-]+)(?:\s*;(.*))?$/);
  si (!m) vuelta nulo;
  vuelta {
    lang: m[1],
    options: m[2] ? m[2].split(";").map(s => s.trim()).filter(Boolean) : []
  };
}

/**
 * Compute ranges (start..end) to skip during replacement:
 * - single-line comments: //...
 * - multi-line comments: /* ... * /
 * - strings: '...', "..."
 * - template literals: `...${...}...`
 *
 * NOTE: This is a best-effort scanner. It handles escapes and nested template expressions to a point.
 * Regex literals are *not* robustly detected and may be treated as code; that can cause edge-case issues.
 */
función computeSkipRanges(src) {
  constante ranges = [];
  constante N = src.length;
  deja i = 0;
  mientras (i < N) {
    constante ch = src[i];
    // single-line comment
    si (ch === "/" && src[i + 1] === "/") {
      constante start = i;
      i += 2;
      mientras (i < N && src[i] !== "\n") i++;
      ranges.push([start, i]);
      continuar;
    }
    // multi-line comment
    si (ch === "/" && src[i + 1] === "*") {
      constante start = i;
      i += 2;
      mientras (i < N && !(src[i] === "*" && src[i + 1] === "/")) i++;
      i += 2; // include closing */
      ranges.push([start, i]);
      continuar;
    }
    // single or double quoted string
    si (ch === "'" || ch === '"') {
      constante quote = ch;
      constante start = i;
      i++;
      mientras (i < N) {
        si (src[i] === "\\") {
          i += 2; // skip escape
          continuar;
        }
        si (src[i] === quote) { i++; romper; }
        i++;
      }
      ranges.push([start, i]);
      continuar;
    }
    // template literal - attempt to handle ${...} nested
    si (ch === "`") {
      constante start = i;
      i++;
      mientras (i < N) {
        si (src[i] === "\\") { i += 2; continuar; }
        si (src[i] === "`") { i++; romper; }
        si (src[i] === "$" && src[i + 1] === "{") {
          // enter embedded expression - we'll skip parsing inside expressions,
          // but must find its end (balanced braces) - very simple stack
          i += 2;
          deja depth = 1;
          mientras (i < N && depth > 0) {
            si (src[i] === "'" || src[i] === '"') {
              // skip inner strings
              constante q = src[i++];
              mientras (i < N) {
                si (src[i] === "\\") { i += 2; continuar; }
                si (src[i] === q) { i++; romper; }
                i++;
              }
              continuar;
            }
            si (src[i] === "`") { i++; continuar; } // rare nested template
            si (src[i] === "{") { depth++; i++; continuar; }
            si (src[i] === "}") { depth--; i++; continuar; }
            si (src[i] === "/" && src[i+1] === "*") {
              // naive skip comment inside expression
              i += 2;
              mientras (i < N && !(src[i] === "*" && src[i+1] === "/")) i++;
              si (i < N) i += 2;
              continuar;
            }
            si (src[i] === "/" && src[i+1] === "/") {
              // consume to newline
              i += 2;
              mientras (i < N && src[i] !== "\n") i++;
              continuar;
            }
            i++;
          }
          continuar;
        }
        i++;
      }
      ranges.push([start, i]);
      continuar;
    }
    i++;
  }
  vuelta ranges;
}

/**
 * Replace localized keywords with canonical names
 * while skipping given ranges.  `mapping` is an
 * object { localized: canonical, ... }.
 */
función replaceOutsideRanges(src, ranges, mapping) {
  // Build a regex that matches any localized keyword
  // as a full word.  Use word boundary \b but also
  // allow unicode letters in keywords; \b is
  // generally OK.
  constante keys = Object.keys(mapping)
    .map(k => escapeForRegex(k))
    .sort((a,b) => b.length - a.length);
       // longer first to avoid partial matches
  si (keys.length === 0) vuelta src;
  constante re = nuevo
    RegExp(`\\b(${keys.join("|")})\\b`, "gu");

  deja out = "";
  deja pos = 0;
  deja rIndex = 0;

  // helper: get next skip range
  función nextRange() {
    vuelta rIndex < ranges.length ?
      ranges[rIndex] : nulo;
  }

  // iterate through source, copying and transforming
  mientras (pos < src.length) {
    constante r = nextRange();
    si (r && pos >= r[1]) {
      rIndex++;
      continuar;
    }
    si (r && pos < r[0]) {
      // process code chunk from pos..r[0]
      constante chunk = src.slice(pos, r[0]);
      // replace localized keywords in this chunk
      constante transformed = chunk.replace(re,
        (m) => mapping[m] ||
               mapping[m.toLowerCase()] || m);
      out += transformed;
      pos = r[0];
      continuar;
    }
    si (!r) {
      // no more ranges - process remainder
      constante chunk = src.slice(pos);
      out += chunk.replace(re,
        (m) => mapping[m] ||
               mapping[m.toLowerCase()] || m);
      romper;
    }
    // we're inside a skip range: copy it verbatim
    out += src.slice(r[0], r[1]);
    pos = r[1];
    rIndex++;
  }

  vuelta out;
}

función escapeForRegex(s) {
  vuelta s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

función loadMapForLang(lang, mapFile) {
  // priority:
  // 1) If mapFile provided, load it (must be JSON mapping localized->canonical)
  // 2) If built-in exists for lang, use it
  // 3) Try language family, e.g. es-MX -> es
  si (mapFile) {
    intentar {
      constante raw = fs.readFileSync(mapFile, "utf8");
      vuelta JSON.parse(raw);
    } capturar (e) {
      throw nuevo Error("Failed to load map file: " + e.message);
    }
  }
  si (builtInMaps[lang]) vuelta builtInMaps[lang];
  constante base = lang.split("-")[0];
  si (builtInMaps[base]) vuelta builtInMaps[base];
  vuelta nulo;
}

// --- CLI ---

función printUsageAndExit(code = 1) {
  console.log(`
slt-js: Reference SLT -> JavaScript transpiler

Usage:
  slt-js.js [options] <input.js>
Options:
  -o, --out <file>       write output to file (otherwise stdout)
  --map <map.json>       load keyword map JSON (localized -> canonical)
  --list-langs           list built-in languages
  --reverse              reverses mapping for forward transpilation
  -h, --help             show this help
`);
  process.exit(code);
}

función listLangs() {
  console.log("Built-in languages:");
  Object.keys(builtInMaps)
    .forEach(k => console.log("  - " + k));
  process.exit(0);
}

async función main() {
  constante argv = process.argv.slice(2);
  si (argv.length === 0) printUsageAndExit(0);

  deja inputFile = nulo;
  deja outFile = nulo;
  deja mapFile = nulo;
  deja imapFile = nulo;
  deja reverse = falso;

  para (deja i = 0; i < argv.length; i++) {
    constante a = argv[i];
    si (a === "--list-langs") { listLangs(); }
    si (a === "-h" || a === "--help")
      printUsageAndExit(0);
    si (a === "-o" || a === "--out")
      { outFile = argv[++i]; continuar; }
    si (a === "--map")
      { mapFile = argv[++i]; continuar; }
    si (a === "--imap")
      { imapFile = argv[++i]; continuar; }
    si (a === "--reverse")
      { reverse = verdadero; continuar; }
    si (!inputFile) inputFile = a;
    sino printUsageAndExit(1);
  }

  si (!inputFile) printUsageAndExit(1);

  constante src = fs.readFileSync(inputFile, "utf8");
  constante firstLine = src.split(/\r?\n/, 1)[0] || "";
  constante slt = parseSltLine(firstLine);
  si (!slt && !reverse) {
    // No SLT header -> just copy through
    si (outFile)
      fs.writeFileSync(outFile, src, "utf8");
    sino
      process.stdout.write(src);
    vuelta;
  }

  constante lang =
    slt && slt.lang || path.parse(mapFile).name;
  deja mapping = loadMapForLang(lang, mapFile);

  si (!mapping) {
    console.error(`Warning: no keyword map for \
      language "${lang}". Falling back to no-op.`);
    si (outFile) fs.writeFileSync(outFile, src,
      "utf8");
    sino process.stdout.write(src);
    vuelta;
  }

  si (imapFile) {
    constante imapping = loadMapForLang(lang, imapFile);
    Object.assign(mapping, imapping);
  }

  si (reverse) {
    mapping = Object.fromEntries(
        Object.entries(mapping)
          .map(([key, value]) => [value, key])
          .reverse()
    );
  }

  // Compute skip ranges and do replacement on rest
  constante ranges = computeSkipRanges(src);
  constante transpiled =
    replaceOutsideRanges(src, ranges, mapping);

  si (outFile) {
    fs.writeFileSync(outFile, transpiled, "utf8");
    console.log(`Wrote transpiled output to ${outFile}`);
  } sino {
    process.stdout.write(transpiled);
  }
}

si (require.main === módulo) {
  main().capturar(err => {
    console.error("Error:", err.stack || err);
    process.exit(2);
  });
}
