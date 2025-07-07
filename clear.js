const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdout.write("hi");
process.stdout.clearLine(-1);
process.stdout.cursorTo(0);
process.stdout.write("wow");
process.stdout.write("\n");

process.stdout.write("hi again");
process.stdout.write("\n");
process.stdout.write("domo");
process.stdout.write("\n");

process.stdout.moveCursor(0, -1);
process.stdout.clearLine(1);
process.stdout.moveCursor(0, -1);
process.stdout.clearLine(1);


var lines = [""];
var cursor_x = 0;
var cursor_y = 0;
var linesDrawn = 0;

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }

  let sequence = key.sequence;
  type(sequence);
  updateView();
});


function type(sequence) {
  lines[cursor_y] =
    lines[cursor_y].slice(0, cursor_x) +
    sequence +
    lines[cursor_y].slice(cursor_x);
  cursor_x++;
}

function updateView() {
  clear();
  process.stdout.write(lines.join("\n"));
  linesDrawn = lines.length;
  process.stdout.moveCursor(0, cursor_y-linesDrawn+1);
  process.stdout.cursorTo(cursor_x);
}

function clear() {
  const y = linesDrawn - cursor_y
  process.stdout.moveCursor(0, y);
  clearLines(linesDrawn);
}

function clearLines(n) {
  for (let i = 0; i < n; i++) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    // if (i>0) {
      process.stdout.moveCursor(0, -1);
    // }
  }
}

