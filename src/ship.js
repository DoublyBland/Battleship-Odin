const ship = (size) => { // ship factory
  const length = size;
  const hits = initializeHits(length);
  const sunkStatus = isSunk();
  const positions = [];

  function initializeHits(length) {
    const newArray = [];
    for (let i = 0; i < length; i++) {
      newArray.push(0); // safe spaces hold a 0
    }
    return newArray;
  }

  function hit(position) {
    hits[position - 1] = 1; // hit spaces hold a 1
    isSunk();
  }

  function isSunk() {
    let totalHits = 0;
    for (let i = 0; i < hits.length; i++) {
      totalHits += hits[i];
    }
    if (totalHits === hits.length) { // if all array values are 1
    //   ship.sunkStatus = true;
      return true;
    }
    // sunkStatus = false;
    return false;
  }

  return {
    length, hits, sunkStatus, hit, isSunk, positions,
  };
};

module.exports = ship;
