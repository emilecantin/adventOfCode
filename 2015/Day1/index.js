'use strict';

const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');

var floor = 0;
var position;

for (let i = 0; i < input.length; i++) {
  floor += input.charAt(i) === '(' ? 1 : -1;
  if (!position && floor < 0) {
    position = i + 1; // positions are 1-indexed, apparently
  }
}

console.log('Final floor:', floor);
console.log('Question 2:', position);
