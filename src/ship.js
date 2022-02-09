const ship = (size) => { // ship factory
  const length = size;
  const hits = initializeHits(length);
  const sunkStatus = false;

  function initializeHits(length) {
    const newArray = [];
    for (let i = 0; i < length; i++) {
      newArray.push(0); // safe spaces hold a 0
    }
    return newArray;
  }

  function hit(position, hits) {
    hits[position - 1] = 1; // hit spaces hold a 1
  }

  function isSunk(hits) {
    let totalHits = 0;
    for (let i = 0; i < hits.length; i++) {
      totalHits += hits[i];
    }
    if (totalHits === hits.length) { // if all array values are 1
      return true;
    }
    return false;
  }

  return {
    length, hits, sunkStatus, hit, isSunk,
  };
};

module.exports = ship;
