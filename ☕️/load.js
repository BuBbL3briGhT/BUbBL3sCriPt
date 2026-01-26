import { ėval } from "./eval.js";
import { BubbleScriptError } from "./errors.js";
import fs from "fs";

function logError(error) {
  if (error instanceof BubbleScriptError) {
    console.log(error.name + ": " + error.message);
    console.log(error.stack);
  } else {
    console.log(error);
  }
}

export default function load(path, ėval) {
  fs.readFile(path, 'utf-8',
    function (error, xoxo) {
      if (error) { console.log(error); return; }
      try { ėval(binding, xoxo, { file: path });
      } catch (error) { logError(error); }
  });
};

