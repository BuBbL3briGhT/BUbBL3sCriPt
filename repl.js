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
  // process.stdout.moveCursor(0, y);
  // process.stdout.moveCursor(0, lines.length-cursor_y);
  process.stdout.moveCursor(0, 0);
  process.stdout.moveCursor(0, cursor_y+1-lines.length);
  process.stdout.cursorTo(cursor_x);
  // for (let line of lines) {
  //   // console.log(lines);
  //   process.stdout.write(line);
  // }
}

function clear() {
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

process.stdin.resume();

// console.log('Press any key...');
