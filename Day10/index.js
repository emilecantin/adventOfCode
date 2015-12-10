'use strict';

// const input = '1';
const input = '3113322113';

function lookAndSay(input, iterations) {
  let curStr = input;
  for (let i = 0; i < iterations; i++) {
    let curChar;
    let curCharCount = 0;
    let nextStr = '';
    for (let j = 0; j < curStr.length; j++) {
      if (curChar !== curStr.charAt(j)) {
        // we are at a character change boundary
        nextStr += curChar ? curCharCount + curChar : '';
        curChar = curStr.charAt(j);
        curCharCount = 1;
      } else {
        curCharCount++;
      }
    }
    nextStr += curCharCount + curChar;
    curStr = nextStr;
  }
  return curStr;
}

console.log('Part 1:', lookAndSay(input, 40).length);
console.log('Part 2:', lookAndSay(input, 50).length);
