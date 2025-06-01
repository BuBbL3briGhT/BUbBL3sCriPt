const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

var currentLine = "";
var lines = [currentLine];
var cursor_x = 0;
var cursor_y = 0;

process.stdin.on('keypress', (str, key) => {
  // console.log('Key pressed:', key);
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }
  currentLine += key.name;
  updateView();
});

function updateView() {
  clear();
  for (let line of lines) {
    console.log(line);
  }
}

function clear() {
  clearLines(lines.length);
}

function clearLines(n) {
  for (let i = 0; i < n; i++) {
    const y = i === 0 ? null : -1;
    process.stdout.moveCursor(0, y);
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
  }
}

process.stdin.resume();

// console.log('Press any key...');
