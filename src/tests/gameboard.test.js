const gameboard = require('../gameboard');
const ship = require('../ship');

test('creates new gameboard objects', () => {
  const newBoard = gameboard();
  expect(typeof newBoard).toBe('object');
});

test('initializes 100 length array', () => {
  const newBoard = gameboard();
  expect(newBoard.board.length).toBe(100);
});

test('initialize each space to show not hit and no ship', () => {
  const newBoard = gameboard();
  expect(newBoard.board[34].isHit).toBe(false);
  expect(newBoard.board[57].isShip).toBe(false);
});

test('take in x, y and return correct position in array', () => {
  const newBoard = gameboard();

  const position = newBoard.interpretXY(5, 6);
  expect(position).toBe(54);
});

test('take in x, y and return correct position in array', () => {
  const newBoard = gameboard();

  const position = newBoard.interpretXY(1, 1);
  expect(position).toBe(0);
});

test('take in x, y and return correct position in array', () => {
  const newBoard = gameboard();

  const position = newBoard.interpretXY(1, 6);
  expect(position).toBe(50);
});

test('places ship at coordinates given ship, position, and direction', () => {
  const newBoard = gameboard();
  const newShip = ship(3);
  newBoard.placeShip(newShip, 5, 6, 'vertical');
  expect(newBoard.board[54].isShip).toBe(true);
  expect(newBoard.board[64].isShip).toBe(true);
  expect(newBoard.board[74].isShip).toBe(true);
});

test('places ships horizontally', () => {
  const newBoard = gameboard();
  const newShip = ship(3);
  newBoard.placeShip(newShip, 5, 6, 'horizontal');
  expect(newBoard.board[54].isShip).toBe(true);
  expect(newBoard.board[55].isShip).toBe(true);
  expect(newBoard.board[56].isShip).toBe(true);
});

test('ship tracks its own position once placed', () => {
  const newBoard = gameboard();
  const newShip = ship(3);
  newBoard.placeShip(newShip, 5, 6, 'horizontal');
  expect(newShip.positions).toEqual([54, 55, 56]);
});

test('do not allow ships to be placed if length would overflow board', () => {
  const newBoard = gameboard();
  const newShip = ship(3);
  newBoard.placeShip(newShip, 9, 6, 'horizontal');
  expect(newShip.positions).toEqual([]);
});

test('do no allow ships to be placed on top of one another', () => {
  const newBoard = gameboard();
  const newShip = ship(3);
  newBoard.placeShip(newShip, 5, 6, 'horizontal');
  const newShip2 = ship(3);
  newBoard.placeShip(newShip2, 5, 6, 'horizontal');
  expect(newShip2.positions).toEqual([]);
});

test('board holds ships', () => {
  const newBoard = gameboard();
  const newShip = ship(3);
  newBoard.placeShip(newShip, 5, 6, 'horizontal');
  const newShip2 = ship(3);
  newBoard.placeShip(newShip2, 5, 5, 'horizontal');
  expect(newBoard.ships.length).toBe(2);
});

test('receiveAttack() records hits spaces and calls hit() function on ship', () => {
  const newBoard = gameboard();
  const newShip = ship(3);
  newBoard.placeShip(newShip, 5, 6, 'horizontal');
  newBoard.receiveAttack(5, 6);
  expect(newBoard.board[54].isHit).toBe(true);
  expect(newBoard.ships[0].hits).toEqual([1, 0, 0]);
});

test('receiveAttack() records hits spaces and calls hit() function on ship', () => {
  const newBoard = gameboard();
  const newShip = ship(3);
  newBoard.placeShip(newShip, 5, 6, 'horizontal');
  newBoard.receiveAttack(6, 6);
  newBoard.receiveAttack(7, 6);
  expect(newBoard.board[55].isHit).toBe(true);
  expect(newBoard.ships[0].hits).toEqual([0, 1, 1]);
});

test('board tracks whether all boats are sunk', () => {
  const newBoard = gameboard();
  const newShip = ship(2);
  newBoard.placeShip(newShip, 6, 6, 'horizontal');
  newBoard.receiveAttack(6, 6);
  newBoard.receiveAttack(7, 6);
  expect(newShip.hits).toEqual([1, 1]);
  expect(newShip.isSunk()).toBe(true);
  expect(newShip.sunkStatus).toBe(true);
  expect(newBoard.allSunk).toBe(true);
});
