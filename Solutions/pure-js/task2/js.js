let arr = [];
function commonWords(array1, array2) {
  for (let i = 0; i < array2.length; i++) {
    array1.forEach((element) => {
      if (element === array2[i]) {
        arr.push(array2[i]);
      }
    });
  }
  return arr;
}
const array1 = ["Tea", "Coffe", "Juice", "Water", "Milkshake"];
const array2 = ["Cake", "Milkshake", "Chocolate", "Coffe"];
console.log(commonWords(array1, array2));
