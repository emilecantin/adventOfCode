var fs = require('fs');

var input = fs.readFileSync('./input', 'utf8');
// input = '^v^v^v^v^v';


// Part 1
var grid = [[]];
var i = 100, j = 100;
grid[i] = [];
grid[i][j] = 1;


for (k = 0; k < input.length; k++) {
  if (input[k] === '<') {
    i = i - 1;
  } else if (input[k] === '>') {
    i = i + 1;
  } else if (input[k] === 'v') {
    j = j - 1;
  } else if (input[k] === '^') {
    j = j + 1;
  }
  grid[i] = grid[i] || [];
  grid[i][j] = grid[i][j] || 0;
  grid[i][j] = grid[i][j] + 1;
}

result = grid.reduce(function(memo, value){
  return memo + value.reduce(function(memo, value) {
    return value > 0 ? memo + 1 : memo;
  }, 0);
}, 0);

console.log('Part 1:', result);

// Part 2
var grid = [[]];
var santa_i = 100, santa_j = 100;
var robot_i = 100, robot_j = 100;
grid[santa_i] = [];
grid[santa_i][santa_j] = 1;

for (k = 0; k < input.length; k++) {
  if (k % 2 === 0) {
    if (input[k] === '<') {
      santa_i = santa_i - 1;
    } else if (input[k] === '>') {
      santa_i = santa_i + 1;
    } else if (input[k] === 'v') {
      santa_j = santa_j - 1;
    } else if (input[k] === '^') {
      santa_j = santa_j + 1;
    }
    grid[santa_i] = grid[santa_i] || [];
    grid[santa_i][santa_j] = grid[santa_i][santa_j] || 0;
    grid[santa_i][santa_j] = grid[santa_i][santa_j] + 1;
  } else {
    if (input[k] === '<') {
      robot_i = robot_i - 1;
    } else if (input[k] === '>') {
      robot_i = robot_i + 1;
    } else if (input[k] === 'v') {
      robot_j = robot_j - 1;
    } else if (input[k] === '^') {
      robot_j = robot_j + 1;
    }
    grid[robot_i] = grid[robot_i] || [];
    grid[robot_i][robot_j] = grid[robot_i][robot_j] || 0;
    grid[robot_i][robot_j] = grid[robot_i][robot_j] + 1;
  }
}

result = grid.reduce(function(memo, value){
  return memo + value.reduce(function(memo, value) {
    return value > 0 ? memo + 1 : memo;
  }, 0);
}, 0);


console.log('Part 2:', result);

