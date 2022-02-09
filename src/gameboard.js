const newShip = require('./ship');

const gameboard = () => { // gameboard factory
  const board = initBoardArray();

  function initBoardArray() {
    const boardArray = [];
    for (let i = 0; i < 100; i++) {
      boardArray.push({ isHit: false, isShip: false, ship: '' });
    }
    return boardArray;
  }

  function placeShip(length, x, y, direction) {
    const ship = newShip(length);
    // if(checkPlacement(ship, x, y, direction))
    const start = interpretXY(x, y);
    let incrementValue;
    if (direction === 'vertical') {
      incrementValue = 10;
    } else if (direction === 'horizontal') {
      incrementValue = 1;
    }
    for (let i = 0; i < ship.length; i++) {
      let point = start;
      if (incrementValue === 10) {
        point += (10 * i);
      } else if (incrementValue === 1) {
        point += i;
      }
      board[point].isShip = true;
    }
  }

  function interpretXY(x, y) {
    const xCoord = x - 1;
    const yCoord = y - 1;
    const coordString = `${xCoord}${yCoord}`;
    return parseInt(coordString);
  }

  function checkPlacement(ship, x, y, direction) {
    const { length } = ship;
  }

  return { board, placeShip, interpretXY };
};

module.exports = gameboard;
