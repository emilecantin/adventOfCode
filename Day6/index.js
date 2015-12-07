'use strict';

const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
// const input = `toggle 0,0 through 999,999`;

const instructions = input.trim().split('\n').map(instruction => {
  const match = instruction.match(/(turn on|turn off|toggle) (\d{1,3}),(\d{1,3}) through (\d{1,3}),(\d{1,3})/);
  if (match) {
    const operation = match[1];
    const startX = parseInt(match[2], 10);
    const startY = parseInt(match[3]);
    const endX = parseInt(match[4]);
    const endY = parseInt(match[5]);
    return {operation, startX, startY, endX, endY}
  } else {
    console.error('no match:', instruction);
  }
});

const grid = [];
const grid2 = [];
for(let i = 0; i < 1000; i++) {
  grid[i] = [];
  grid2[i] = [];
  for(let j = 0; j < 1000; j++) {
    grid[i][j] = false;
    grid2[i][j] = 0;
  }
}

instructions.forEach(instruction => {
  for(var x = instruction.startX; x <= instruction.endX; x++) {
    for(var y = instruction.startY; y <= instruction.endY; y++) {
      switch (instruction.operation) {
        case 'turn on':
          grid[x][y] = true;
          grid2[x][y] += 1;
          break;
        case 'turn off':
          grid[x][y] = false;
          grid2[x][y] -= 1;
          grid2[x][y] = grid2[x][y] < 0 ? 0 : grid2[x][y];
          break;
        case 'toggle':
          grid[x][y] = !grid[x][y];
          grid2[x][y] += 2;
          break;
        default:
          console.error('INVALID INSTRUCTION:', instruction);
      }
    }
  }
});

const result = grid.reduce((memo, row) => {
  return memo + row.reduce((memo, item) => {
    return memo + (item ? 1 : 0)
  }, 0);
}, 0);

const result2 = grid2.reduce((memo, row) => {
  return memo + row.reduce((memo, item) => {
    return memo + item;
  }, 0);
}, 0);

// const result = grid.reduce((memo, row) => +memo + row.reduce((memo, item) => memo + 1));

console.log('Part 1:', result);
console.log('Part 2:', result2);
