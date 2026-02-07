import { BubbleScriptError } from './errors.js';

const log = console.log;

function logError(error) {
  if (error instanceof BubbleScriptError) {
    log(error.name + ': ' + error.message);
    log(error.stack);
  } else {
    log(error);
  }
}

// export default function load(binding, path, fs, ėval) {
//   fs.readFile(path, 'utf-8',
//     function (error, xoxo) {
//       if (error) { return log(error); }
//       try { ėval(binding, xoxo, { file: path });
//       } catch (error) { logError(error); }
//   });
// };

export default function syncLoad(binding, path, fs, ėval) {
  const xoxo = fs.readFileSync(path, 'utf-8');
  ėval(binding, xoxo, { file: path });
}
