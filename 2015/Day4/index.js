'use strict';

const crypto = require('crypto');

const input = 'ckczppom';

let number = 0;
let output = '';
while (!output.match(/^000000/)) {
  const md5 = crypto.createHash('md5');
  number = number + 1;
  md5.update(input + number, 'utf8');
  output = md5.digest('hex');
}

console.log(number);
