// part 1
const input = 'L1, L3, L5, L3, R1, L4, L5, R1, R3, L5, R1, L3, L2, L3, R2, R2, L3, L3, R1, L2, R1, L3, L2, R4, R2, L5, R4, L5, R4, L2, R3, L2, R4, R1, L5, L4, R1, L2, R3, R1, R2, L4, R1, L2, R3, L2, L3, R5, L192, R4, L5, R4, L1, R4, L4, R2, L5, R45, L2, L5, R4, R5, L3, R5, R77, R2, R5, L5, R1, R4, L4, L4, R2, L4, L1, R191, R1, L1, L2, L2, L4, L3, R1, L3, R1, R5, R3, L1, L4, L2, L3, L1, L1, R5, L4, R1, L3, R1, L2, R1, R4, R5, L4, L2, R4, R5, L1, L2, R3, L4, R2, R2, R3, L2, L3, L5, R3, R1, L4, L3, R4, R2, R2, R2, R1, L4, R4, R1, R2, R1, L2, L2, R4, L1, L2, R3, L3, L5, L4, R4, L3, L1, L5, L3, L5, R5, L5, L4, L2, R1, L2, L4, L2, L4, L1, R4, R4, R5, R1, L4, R2, L4, L2, L4, R2, L4, L1, L2, R1, R4, R3, R2, R2, R5, L1, L2';

const moves = input.split(', ');

const directions = [
  [0, 1], // north
  [1, 0], // east
  [0, -1], // south
  [-1, 0], // west
];

let currentDirection = 0 // north
let currentPosition = [0, 0];
let visitedPositions = [];
let firstPositionVisitedTwice;
visitedPositions.push(currentPosition);
for(i = 0; i < moves.length; i++) {
  const move = moves[i];
  const turn = move.substring(0,1);
  const length = parseInt(move.substring(1));
  if(turn === 'L') {
    currentDirection = (currentDirection + 1 + directions.length) % directions.length;
  } else if(turn === 'R') {
    currentDirection = (currentDirection - 1 + directions.length) % directions.length;
  } else {
    throw new Error('unknown turn:' + turn);
  }
  for(j = 0; j < length; j++) {
    currentPosition = [
      currentPosition[0] + directions[currentDirection][0],
      currentPosition[1] + directions[currentDirection][1],
    ];
    if(!firstPositionVisitedTwice) {
      for(k = 0; k < visitedPositions.length && !firstPositionVisitedTwice; k++) {
        const position = visitedPositions[k];
        if(position[0] === currentPosition[0] && position[1] === currentPosition[1]) {
          firstPositionVisitedTwice = currentPosition;
        }
      }
    }
    visitedPositions.push(currentPosition)
  }
  // console.log(currentPosition);
}

const result1 = Math.abs(currentPosition[0]) + Math.abs(currentPosition[1]);
const result2 = Math.abs(firstPositionVisitedTwice[0]) + Math.abs(firstPositionVisitedTwice[1]);
// console.log(firstPositionVisitedTwice);

console.log('Part 1:' + result1);
console.log('Part 2:' + result2);
