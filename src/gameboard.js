const newShip = require('./ship');

const gameboard = () => { // gameboard factory
  const board = initBoardArray();
  const ships = [];
  const allSunk = checkSunk();

  function initBoardArray() {
    const boardArray = [];
    for (let i = 0; i < 100; i++) {
      boardArray.push({ isHit: false, isShip: false, ship: '' });
    }
    return boardArray;
  }

  function placeShip(ship, x, y, direction) {
    // const ship = newShip(length);
    // if(checkPlacement(ship, x, y, direction))
    const start = interpretXY(x, y);
    if (checkPlacement(ship, start, direction)) {
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
        ship.positions.push(point);
      }
    }
    if (ship.positions.length > 0) {
      ships.push(ship);
    }
  }

  function receiveAttack(x, y) {
    const position = interpretXY(x, y);
    board[position].isHit = true;
    let hitShip = [];
    if (board[position].isShip === true) {
      // ships.filter(checkShip(ship, position));
      hitShip = ships.filter((ship) => {
        if (ship.positions.includes(position)) {
          return ship;
        }

        return null;
      });
    }
    const indexOfHit = (hitShip[0].positions.indexOf(position)) + 1;
    hitShip[0].hit(indexOfHit);
    if (hitShip[0].isSunk) {
      hitShip[0].sunkStatus = true;
    }
    checkSunk();
  }

  function interpretXY(x, y) {
    if (y < 2) {
      return (x - 1);
    }
    const xCoord = x - 1;
    const yCoord = y - 1;
    const coordString = `${yCoord}${xCoord}`;
    return (parseInt(coordString));// return array position, array start at 0
  }

  function checkPlacement(ship, startPosition, direction) {
    let safe = true;
    let incrementValue;
    const xCheck = startPosition % 10;
    const yCheck = startPosition + 1;
    if (xCheck + ship.length >= 10 || (yCheck + ((ship.length - 1) * 10)) > 100) {
      safe = false;
      return safe;
    }
    if (direction === 'vertical') {
      incrementValue = 10;
    } else if (direction === 'horizontal') {
      incrementValue = 1;
    }
    for (let i = 0; i < ship.length; i++) {
      let point = startPosition;
      if (incrementValue === 10) {
        point += (10 * i);
      } else if (incrementValue === 1) {
        point += i;
      }
      if (board[point].isShip === true) {
        safe = false;
        break;
      }
    }
    return safe;
  }

  function checkSunk() {
    const sunkShips = ships.filter((ship) => ship.sunkStatus === true);
    if (sunkShips.length === ships.length) {
      return true;
    }
    return false;
  }

  return {
    board, placeShip, interpretXY, ships, receiveAttack, allSunk,
  };
};

module.exports = gameboard;
