'use strict';

const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
// const input = `
// ""
// "abc"
// "aaa\\"aaa"
// "\\x27"`;

const strings = input.trim().split('\n');

const totalLength = strings.reduce((memo, str) => memo + str.length, 0);
const parsedLength = strings.map(str => eval(str)).reduce((memo, str) => memo + str.length, 0);

console.log('Part 1:', totalLength - parsedLength);

const escapedLength = strings.map(str => str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')).reduce((memo, str) => memo + str.length + 2, 0);


console.log('Part 2:', escapedLength - totalLength);

