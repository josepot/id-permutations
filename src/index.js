const f = [];
function factorial(n) {
  if (n < 2) return 1;
  return f[n] > 0 ? f[n] : (f[n] = factorial(n - 1) * n);
}

const zeroRange = x => {
  const res = new Array(x);
  for (let i = 0; i < x; i++) res[i] = i;
  return res;
};

const fromNumberToPositions = nPositions => {
  const positions = zeroRange(nPositions).map(id => ({id}));
  for (let i = 0; i < nPositions - 1; i++) positions[i].next = positions[i + 1];

  return x => {
    const result = new Array(nPositions);
    let init = positions[0];

    let idx = 0;
    for (let i = nPositions; i > 1; i--) {
      const mod = x % i;
      x = Math.trunc(x / i);

      if (mod === 0) {
        result[idx++] = init.id;
        init = init.next;
        continue;
      }

      let prev = init;
      for (let z = 1; z < mod; z++) prev = prev.next;

      result[idx++] = prev.next.id;
      prev.next = prev.next.next;
    }

    result[idx] = init.id;
    for (let i = 0; i < nPositions - 1; i++)
      positions[i].next = positions[i + 1];
    return result;
  };
};

const fromPositionsToNumber = nPositions => {
  let diff = factorial(nPositions);
  const nDeltas = nPositions - 1;
  const deltas = new Array(nDeltas);

  for (let i = 2, d = nDeltas; i < nPositions + 1; i++) {
    diff /= i;
    deltas[--d] = zeroRange(i).map(x => x * diff);
  }

  return position => {
    const positionLastIdx = position.length - 1;
    let initialNode = {
      start: position[positionLastIdx],
      nextStart: position[positionLastIdx] + 1,
      count: 1,
    };
    initialNode.prev = {nextStart: -Infinity, next: initialNode};
    initialNode.next = {start: Infinity, prev: initialNode};

    const mods = new Array(positionLastIdx);

    for (let i = position.length - 2; i > 0; i--) {
      let node = initialNode;
      let number = position[i];
      mods[i] = 0;
      while (number > node.start) {
        mods[i] += node.count;
        node = node.next;
      }

      if (node.prev.nextStart + 1 === node.start) {
        node.start = node.prev.start;
        node.count += node.prev.count + 1;

        if (node.prev === initialNode) initialNode = node;
        node.prev = node.prev.prev;
        node.prev.next = node;
        continue;
      }
      if (node.start - 1 === number) {
        node.start--;
        node.count++;
        continue;
      }
      if (node.prev.nextStart === number) {
        node.prev.count++;
        node.prev.nextStart++;
        continue;
      }

      const newNode = {
        start: number,
        nextStart: number + 1,
        count: 1,
        next: node,
        prev: node.prev,
      };
      if (node === initialNode) initialNode = newNode;
      node.prev = newNode;
      newNode.prev.next = newNode;
      node = newNode;
    }
    mods[0] = position[0];
    let res = 0;
    for (let i = 0; i < nDeltas; i++) res += deltas[i][mods[i]];
    return res;
  };
};

module.exports = nPositions => ({
  getPermutationsFromId: fromNumberToPositions(nPositions),
  getIdFromPermutations: fromPositionsToNumber(nPositions),
});
