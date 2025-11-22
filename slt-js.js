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

const fs = require("fs");
const path = require("path");

// --- Built-in keyword maps (example: Spanish) ---
const builtInMaps = {
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

function parseSltLine(firstLine) {
  // Expect: #!slt <language-tag> [;options]
  const m = firstLine.trim().match(/^#!slt\s+([A-Za-z0-9\-]+)(?:\s*;(.*))?$/);
  if (!m) return null;
  return {
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
function computeSkipRanges(src) {
  const ranges = [];
  const N = src.length;
  let i = 0;
  while (i < N) {
    const ch = src[i];
    // single-line comment
    if (ch === "/" && src[i + 1] === "/") {
      const start = i;
      i += 2;
      while (i < N && src[i] !== "\n") i++;
      ranges.push([start, i]);
      continue;
    }
    // multi-line comment
    if (ch === "/" && src[i + 1] === "*") {
      const start = i;
      i += 2;
      while (i < N && !(src[i] === "*" && src[i + 1] === "/")) i++;
      i += 2; // include closing */
      ranges.push([start, i]);
      continue;
    }
    // single or double quoted string
    if (ch === "'" || ch === '"') {
      const quote = ch;
      const start = i;
      i++;
      while (i < N) {
        if (src[i] === "\\") {
          i += 2; // skip escape
          continue;
        }
        if (src[i] === quote) { i++; break; }
        i++;
      }
      ranges.push([start, i]);
      continue;
    }
    // template literal - attempt to handle ${...} nested
    if (ch === "`") {
      const start = i;
      i++;
      while (i < N) {
        if (src[i] === "\\") { i += 2; continue; }
        if (src[i] === "`") { i++; break; }
        if (src[i] === "$" && src[i + 1] === "{") {
          // enter embedded expression - we'll skip parsing inside expressions,
          // but must find its end (balanced braces) - very simple stack
          i += 2;
          let depth = 1;
          while (i < N && depth > 0) {
            if (src[i] === "'" || src[i] === '"') {
              // skip inner strings
              const q = src[i++];
              while (i < N) {
                if (src[i] === "\\") { i += 2; continue; }
                if (src[i] === q) { i++; break; }
                i++;
              }
              continue;
            }
            if (src[i] === "`") { i++; continue; } // rare nested template
            if (src[i] === "{") { depth++; i++; continue; }
            if (src[i] === "}") { depth--; i++; continue; }
            if (src[i] === "/" && src[i+1] === "*") {
              // naive skip comment inside expression
              i += 2;
              while (i < N && !(src[i] === "*" && src[i+1] === "/")) i++;
              if (i < N) i += 2;
              continue;
            }
            if (src[i] === "/" && src[i+1] === "/") {
              // consume to newline
              i += 2;
              while (i < N && src[i] !== "\n") i++;
              continue;
            }
            i++;
          }
          continue;
        }
        i++;
      }
      ranges.push([start, i]);
      continue;
    }
    i++;
  }
  return ranges;
}

/**
 * Replace localized keywords with canonical names while skipping given ranges.
 * `mapping` is an object { localized: canonical, ... }.
 */
function replaceOutsideRanges(src, ranges, mapping) {
  // Build a regex that matches any localized keyword as a full word.
  // Use word boundary \b but also allow unicode letters in keywords; \b is generally OK.
  const keys = Object.keys(mapping)
    .map(k => escapeForRegex(k))
    .sort((a,b) => b.length - a.length); // longer first to avoid partial matches
  if (keys.length === 0) return src;
  const re = new RegExp(`\\b(${keys.join("|")})\\b`, "gu");

  let out = "";
  let pos = 0;
  let rIndex = 0;

  // helper: get next skip range
  function nextRange() {
    return rIndex < ranges.length ? ranges[rIndex] : null;
  }

  // iterate through source, copying and transforming
  while (pos < src.length) {
    const r = nextRange();
    if (r && pos >= r[1]) {
      rIndex++;
      continue;
    }
    if (r && pos < r[0]) {
      // process code chunk from pos..r[0]
      const chunk = src.slice(pos, r[0]);
      // replace localized keywords in this chunk
      const transformed = chunk.replace(re, (m) => mapping[m] || mapping[m.toLowerCase()] || m);
      out += transformed;
      pos = r[0];
      continue;
    }
    if (!r) {
      // no more ranges - process remainder
      const chunk = src.slice(pos);
      out += chunk.replace(re, (m) => mapping[m] || mapping[m.toLowerCase()] || m);
      break;
    }
    // we're inside a skip range: copy it verbatim
    out += src.slice(r[0], r[1]);
    pos = r[1];
    rIndex++;
  }

  return out;
}

function escapeForRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function loadMapForLang(lang, mapFile) {
  // priority:
  // 1) If mapFile provided, load it (must be JSON mapping localized->canonical)
  // 2) If built-in exists for lang, use it
  // 3) Try language family, e.g. es-MX -> es
  if (mapFile) {
    try {
      const raw = fs.readFileSync(mapFile, "utf8");
      return JSON.parse(raw);
    } catch (e) {
      throw new Error("Failed to load map file: " + e.message);
    }
  }
  if (builtInMaps[lang]) return builtInMaps[lang];
  const base = lang.split("-")[0];
  if (builtInMaps[base]) return builtInMaps[base];
  return null;
}

// --- CLI ---

function printUsageAndExit(code = 1) {
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

function listLangs() {
  console.log("Built-in languages:");
  Object.keys(builtInMaps).forEach(k => console.log("  - " + k));
  process.exit(0);
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) printUsageAndExit(0);

  let inputFile = null;
  let outFile = null;
  let mapFile = null;
  let reverse = false;

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--list-langs") { listLangs(); }
    if (a === "-h" || a === "--help") printUsageAndExit(0);
    if (a === "-o" || a === "--out") { outFile = argv[++i]; continue; }
    if (a === "--map") { mapFile = argv[++i]; continue; }
    if (a === "--reverse") { reverse = true; continue; }
    if (!inputFile) inputFile = a;
    else printUsageAndExit(1);
  }

  if (!inputFile) printUsageAndExit(1);

  const src = fs.readFileSync(inputFile, "utf8");
  const firstLine = src.split(/\r?\n/, 1)[0] || "";
  const slt = parseSltLine(firstLine);
  if (!slt && !reverse) {
    // No SLT header -> just copy through
    if (outFile) fs.writeFileSync(outFile, src, "utf8");
    else process.stdout.write(src);
    return;
  }

  const lang = slt && slt.lang;
  let mapping = loadMapForLang(lang, mapFile);

  if (!mapping) {
    console.error(`Warning: no keyword map for language "${lang}". Falling back to no-op.`);
    if (outFile) fs.writeFileSync(outFile, src, "utf8");
    else process.stdout.write(src);
    return;
  }

  if (reverse) {
    console.log("reverse map");
    mapping = Object.fromEntries(
        Object.entries(mapping)
          .map(([key, value]) => [value, key])
          .reverse() // Reverse the mapped array, incase of duplicate values, the first version will be used.
    );
  }

  // Compute skip ranges and do replacement on rest
  const ranges = computeSkipRanges(src);
  const transpiled = replaceOutsideRanges(src, ranges, mapping);

  if (outFile) {
    fs.writeFileSync(outFile, transpiled, "utf8");
    console.log(`Wrote transpiled output to ${outFile}`);
  } else {
    process.stdout.write(transpiled);
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error("Error:", err.stack || err);
    process.exit(2);
  });
}
