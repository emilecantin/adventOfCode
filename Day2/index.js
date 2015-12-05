var fs = require('fs');

var input = fs.readFileSync('./input', 'utf8');

var presents = input.split('\n');

// presents = ['1x1x10', '2x3x4'];

presents = presents.map(present => present.split('x').map(Number));

var wrappingAreas = presents.map(p => {
  var psides = [ p[0]*p[1], p[1]*p[2], p[0]*p[2] ];
  var parea = psides.map(s => s*2).reduce((p, c) => p+c);
  var pslack = psides.reduce((p, c) => p < c ? p : c);
  return parea + pslack;
});

var wrappingArea = wrappingAreas.reduce((p, c) => p+c);
console.log('Wrapping paper:', wrappingArea);

var ribbonLengths = presents.map(p => {
  var perimeters = [ p[0]+p[1], p[1]+p[2], p[0]+p[2] ].map(p => 2*p);
  var wrap = perimeters.reduce((p, c) => p < c ? p : c);
  var bow = p.reduce((p,c) => p*c);
  return wrap + bow;
});

var ribbonLength = ribbonLengths.reduce((p, c) => p+c);

console.log('Ribbon:', ribbonLength);
