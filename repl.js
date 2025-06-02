const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// var currentLine = "";
// var lines = [currentLine];
var lines = [""];
var cursor_x = 0;
var cursor_y = 0;
var linesDrawn = 0;

process.stdin.on('keypress', (str, key) => {
  // console.log('Key pressed:', key);
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }

  if (key.name === 'return') {
    cursor_y++;
    cursor_x = 0;
    // make space for new line. move each line lower down by one starting from the last line.
    for (let i = lines.length;
      i > cursor_y; i--) {
      lines[i] = lines[i-1];
    }
    lines[cursor_y] ||= "";
  } else if (key.name === 'space') {
    type(" ");
  } else if (key.name === 'backspace') {
    backspace();
  } else if (key.name === 'left') {
    cursor_x = Math.max(0, cursor_x - 1);
  } else if (key.name === 'right') {
    cursor_x = Math.min(
      lines[cursor_y].length
      , cursor_x + 1);
  } else if (key.name === 'up') {
    cursor_y = Math.max(0, cursor_y - 1);
    cursor_x = Math.min(cursor_x, lines[cursor_y].length);
  } else if (key.name === 'down') {
    cursor_y = Math.min(lines.length-1, cursor_y + 1);
    cursor_x = Math.min(cursor_x, lines[cursor_y].length);
  }else {
    // currentLine += key.name;
    // currentLine.push(key.name);
    let sequence = key.sequence;
    type(sequence);
  }
  updateView();
});

function type(sequence) {
  lines[cursor_y] =
    lines[cursor_y].slice(0, cursor_x) +
    sequence +
    lines[cursor_y].slice(cursor_x);
  cursor_x++;
}

function backspace() {
  lines[cursor_y] =
    lines[cursor_y].slice(0, cursor_x-1) +
    lines[cursor_y].slice(cursor_x);
  cursor_x = Math.max(0, cursor_x - 1);
}

function updateView() {
  clear();
  process.stdout.write(lines.join("\n"));
  linesDrawn = lines.length;
  process.stdout.moveCursor(0, cursor_y-lines.length+1);
  process.stdout.cursorTo(cursor_x);
}

function clear() {
  const y = linesDrawn - cursor_y
  process.stdout.moveCursor(0, y);
  clearLines(linesDrawn);
}

function clearLines(n) {
  for (let i = 0; i < n; i++) {
    const y = i === 0 ? null : -1;
    process.stdout.moveCursor(0, y);
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
  }
  process.stdout.clearLine(1);
}

function log(msg) {
  process.stdout.moveCursor(0, -10);
  console.log(msg);
  process.stdout.moveCursor(0, 9);
}

process.stdin.resume();

log('Press any key...');
