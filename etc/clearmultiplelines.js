function clearLines(n) {
  for (let i = 0; i < n; i++) {
    const y = i === 0 ? null : -1;
    process.stdout.moveCursor(0, y);
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
  }
}

// Example usage
console.log("Line 1");
console.log("Line 2");
console.log("Line 3");

clearLines(3); // Clear the last 3 lines.
console.log("New line");
