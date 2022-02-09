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
  expect(position).toBe(45);
});

test('places ship at coordinates given ship, position, and direction', () => {
  const newBoard = gameboard();
  newBoard.placeShip(3, 5, 6, 'vertical');
  expect(newBoard.board[45].isShip).toBe(true);
  expect(newBoard.board[55].isShip).toBe(true);
  expect(newBoard.board[65].isShip).toBe(true);
});

test('do not allow ships to be placed if length would overflow board', () => {

});
