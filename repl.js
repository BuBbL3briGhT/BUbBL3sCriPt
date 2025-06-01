const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// var currentLine = "";
// var lines = [currentLine];
var lines = [""];
var cursor_x = 0;
var cursor_y = 0;

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
    lines[cursor_y] = lines[cursor_y] + " "
    cursor_x++;
  } else if (key.name === 'backspace') {
    lines[cursor_y] = lines[cursor_y].slice(0, -1);
    cursor_x = Math.max(0, cursor_x - 1);
  } else if (key.name === 'left') {
    cursor_x = Math.max(0, cursor_x - 1);
  }else {
    // currentLine += key.name;
    // currentLine.push(key.name);
    lines[cursor_y] = lines[cursor_y] + key.name
    cursor_x++;
  }
  updateView();
});

var linesDrawn = 0;

function updateView() {
  clear();

  process.stdout.write(lines.join("\n"));
  linesDrawn = lines.length;
  // process.stdout.moveCursor(0, y);
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
}

process.stdin.resume();

// console.log('Press any key...');
