import { BubbleScriptError } from "./errors.js";

const log = console.log;

function logError(error) {
  if (error instanceof BubbleScriptError) {
    log(error.name + ": " + error.message);
    log(error.stack);
  } else {
    log(error);
  }
}

export default function load(path, fs, ėval) {
  fs.readFile(path, 'utf-8',
    function (error, xoxo) {
      if (error) { log(error) && return; }
      try { ėval(binding, xoxo, { file: path });
      } catch (error) { logError(error); }
  });
};

