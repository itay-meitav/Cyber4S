let array1 = ["A", "B", "C", "D"];
let array2 = [1, 2];

function merge(array1, array2) {
  let mergedArray = [];
  const itrArray = array1.length > array2.length ? array1 : array2;
  for (let i = 0; i < itrArray.length; i++) {
    array1[i] && mergedArray.push(array1[i]);
    array2[i] && mergedArray.push(array2[i]);
  }
  return mergedArray;
}

console.log(merge(array1, array2));
