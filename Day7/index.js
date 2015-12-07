'use strict';

const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
// const input = `
// 123 -> x
// 456 -> y
// x AND y -> d
// x OR y -> e
// x LSHIFT 2 -> f
// y RSHIFT 2 -> g
// NOT x -> h
// NOT y -> i
// 0 -> c
// c -> a
// `;

const instructions = input.trim().split('\n');

const circuit = {};

instructions.forEach(instruction => {
  let match = instruction.match(/^(.+) -> ([a-z]{1,2})$/);
  if (match) {
    circuit[match[2]] = match[1].trim();
  } else {
    console.error('Invalid instruction:', instruction);
  }
});

function evalWire(wire) {
  var match, result;
  var operation = circuit[wire];
  if (typeof operation === 'number') {
    return operation;
  }
  // console.log('Evaluating wire', wire);
  // console.log('Parsing:', operation);
  if (match = operation.match(/^(\d+)$/)) {
    result = parseInt(match[1]);
  } else if (match = operation.match(/^([a-z]{1,2}) (AND|OR|XOR) ([a-z]{1,2})$/)) {
    if (match[2] === 'AND')
      result = evalWire(match[1]) & evalWire(match[3]);
    else if (match[2] === 'OR')
      result = evalWire(match[1]) | evalWire(match[3]);
    else if (match[2] === 'XOR')
      result = evalWire(match[1]) | evalWire(match[3]);
    else
      console.error('Invalid AND/OR/XOR operation:', operation);
  } else if (match = operation.match(/^(\d+) (AND|OR|XOR) ([a-z]{1,2})$/)) {
    if (match[2] === 'AND')
      result = parseInt(match[1]) & evalWire(match[3]);
    else if (match[2] === 'OR')
      result = parseInt(match[1]) | evalWire(match[3]);
    else if (match[2] === 'XOR')
      result = parseInt(match[1]) | evalWire(match[3]);
    else
      console.error('Invalid numeric AND/OR/XOR operation:', operation);
  } else if (match = operation.match(/^([a-z]{1,2}) (L|R)SHIFT (\d+)$/)) {
    if (match[2] === 'L')
      result = evalWire(match[1]) << match[3];
    else if (match[2] === 'R')
      result = evalWire(match[1]) >>> match[3];
    else
      console.error('Invalid SHIFT operation:', operation, match);
  } else if (match = operation.match(/^NOT ([a-z]{1,2})$/)) {
    result = ~ evalWire(match[1]);
  } else if (match = operation.match(/^([a-z]{1,2})$/)) {
    result = evalWire(match[1]);
  } else {
    console.error('Invalid operation:', operation);
    result = null;
  }
  // save the result
  circuit[wire] = result;
  return result;
}

var result1 = evalWire('a');
console.log('Part 1:', result1);

// Reset the citcuit for part 2
instructions.forEach(instruction => {
  let match = instruction.match(/^(.+) -> ([a-z]{1,2})$/);
  if (match) {
    circuit[match[2]] = match[1].trim();
  } else {
    console.error('Invalid instruction:', instruction);
  }
});
// Reset wire b to result of part 1
circuit.b = result1;

console.log('Part 2:', evalWire('a'));
