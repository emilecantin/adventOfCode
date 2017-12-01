'use strict';

const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
// const input = `
// London to Dublin = 464
// London to Belfast = 518
// Dublin to Belfast = 141
// `;

const distances = {};

input.trim().split('\n').forEach(item => {
  let match = item.match(/^(\w+) to (\w+) = (\d+)/);
  if (match) {
    distances[match[1]] = distances[match[1]] || {};
    distances[match[1]][match[2]] = parseInt(match[3]);
    distances[match[2]] = distances[match[2]] || {};
    distances[match[2]][match[1]] = parseInt(match[3]);
  }
});

function permute(array) {
  if (array.length > 1) {
    let newArray = [];
    array.forEach((item, index) => {
      permute(array.slice(0, index).concat(array.slice(index + 1))).forEach(newSubArray => {
        newArray.push([item].concat(newSubArray));
      });
    });
    return newArray;
  } else {
    return array;
  }
}

let routes = permute(Object.keys(distances)).map(route => {
  return route.reduce((memo, location) => {
    return {
      prevLoc: location,
      totalDistance: memo.totalDistance + (memo.prevLoc ? distances[memo.prevLoc][location] : 0)
    }
  }, {prevLoc: null, totalDistance: 0}).totalDistance;
});

let shortestRoute = routes.reduce((memo, route) => route < memo ? route : memo, 999999999999999);
let longestRoute = routes.reduce((memo, route) => route > memo ? route : memo, 0);

console.log('Part 1:', shortestRoute);
console.log('Part 2:', longestRoute);
