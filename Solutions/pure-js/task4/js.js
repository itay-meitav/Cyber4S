const miles = [1, 2, 3, 4, 5, 6];
function milesToKm(array) {
  const km = array.map((item) => item * 1.609);
  return km;
}
// console.log(milesToKm(miles));

function sumKm(array) {
  const sum = array.reduce((item, item2) => item + item2, 0);
  return sum;
}
// console.log(sumKm(miles));

function squaredAv(array) {
  const square = array.map((item) => item ** 2);
  console.log(square);
  const av = square.reduce((a, b) => a + b) / square.length;
  return av;
}
console.log(squaredAv(miles));
