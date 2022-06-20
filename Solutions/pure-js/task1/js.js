const inventory = [
  { name: "Chocolate cake", category: "Sweets", price: 22 },
  { name: "Apples", category: "Fruits", price: 10 },
  { name: "Watermelon", category: "Fruits", price: 35 },
  { name: "Cookies", category: "Sweets", price: 12 },
  { name: "Coffe", category: "Drinks", price: 25 },
  { name: "Water", category: "Drinks", price: 6 },
];
let morethan20 = inventory.filter((item) => item.price > 20);
console.log(morethan20);
