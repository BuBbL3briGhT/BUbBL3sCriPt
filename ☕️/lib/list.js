// JS fallback for list utilities — provides a reliable bubblesort for JS consumers/tests.

function defaultComparator(a, b) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

export function bubblesort(arr, comparator) {
  if (!Array.isArray(arr)) {
    throw new TypeError('bubblesort expects a plain JavaScript array');
  }
  const cmp = comparator || defaultComparator;
  const result = arr.slice(); // copy
  const n = result.length;
  let swapped;
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (cmp(result[j], result[j + 1]) > 0) {
        const tmp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = tmp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return result;
}
