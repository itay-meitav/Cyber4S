var products = [
  { id: 93, name: "Earl Grey Tea", manufacturer: "Wissotzky", quantity: 82 },
  {
    id: 512,
    name: "Chocolate Chip Cookies",
    manufacturer: "Nestle",
    quantity: 25,
  },
  { id: 184, name: "Pasta", manufacturer: "Ossem", quantity: 5 },
  { id: 17, name: "Soy Sauce", manufacturer: "Kikoman", quantity: 32 },
  { id: 405, name: "Butter", manufacturer: "Tnuva", quantity: 2 },
  { id: 405, name: "Orange Juice", manufacturer: "Tnuva", quantity: 19 },
];

const myMap = new Map();
products.forEach((element) => {
  myMap.set(element.id, element);
});

// console.log(myMap);

function lowStock(array) {
  const newArray = array.filter((a) => a.quantity < 10).map((b) => b.id);
  newArray.forEach((element) => {
    console.log(element);
  });
}
lowStock(products);

const newMap = (map) =>
  new Map(
    [...map.entries()].sort(([keyA, valueA], [keyB, valueB]) =>
      valueA.name.localeCompare(valueB.name)
    )
  );
// console.log(newMap(myMap));
