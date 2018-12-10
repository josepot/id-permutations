# id-permutations

Blazing fast algorithms for generating a list of permutations for a given id,
or the id from its corresponding permutation.

## Example

```js
const N_POSITIONS = 10;
const {
  getPermutationsFromId,
  getIdFromPermutations,
} = require('id-permutations')(N_POSITIONS);

getPermutationsFromId(0);       // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
getPermutationsFromId(1); // => [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]
getPermutationsFromId(2); // => [2, 0, 1, 3, 4, 5, 6, 7, 8, 9]
getPermutationsFromId(3628799); // => [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

getIdFromPermutations([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // => 0
getIdFromPermutations([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]); // => 1
getIdFromPermutations([2, 0, 1, 3, 4, 5, 6, 7, 8, 9]); // => 2
getIdFromPermutations([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]); // => 3628799
```
