const ship = require('../ship');

test('creates new ship objects', () => {
  const newShip = ship();
  expect(typeof newShip).toBe('object');
});

test('contains length, hit indicators, and sunk status', () => {
  const newShip = ship(2);
  expect(typeof newShip.length).toBe('number');
  expect(typeof newShip.hits).toBe('object');// array
  expect(typeof newShip.sunkStatus).toBe('boolean');
});

test('takes a length and initializes hits', () => {
  const newShip = ship(5);
  expect(newShip.hits).toEqual([0, 0, 0, 0, 0]);
});

test('hit() takes a number and marks that position as hit', () => {
  const newShip = ship(5);
  newShip.hit(3, newShip.hits);
  expect(newShip.hits).toEqual([0, 0, 1, 0, 0]);
});

test('isSunk() calculates whether ship is sunk based on length and hits', () => {
  const newShip = ship(5);
  newShip.hit(3, newShip.hits);
  newShip.sunkStatus = newShip.isSunk(newShip.hits);
  expect(newShip.sunkStatus).toEqual(false);
});

test('isSunk() returns true when all positions hit', () => {
  const newShip = ship(3);
  newShip.hit(1, newShip.hits);
  newShip.hit(2, newShip.hits);
  newShip.hit(3, newShip.hits);
  newShip.isSunk(newShip.hits);
  newShip.sunkStatus = newShip.isSunk(newShip.hits);
  expect(newShip.hits).toEqual([1, 1, 1]);
  expect(newShip.sunkStatus).toEqual(true);
});
