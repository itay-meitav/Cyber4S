var books = [
  { author: "JK Rowling", title: "Philosopher's Stone", bookID: 506 },
  { author: "JK Rowling", title: "Chamber of Secrets", bookID: 507 },
  { author: "JK Rowling", title: "Prisoner of Azkaban", bookID: 508 },
  { author: "JK Rowling", title: "Goblet of Fire", bookID: 509 },
  { author: "JK Rowling", title: "Order of the Phoenix", bookID: 510 },
  { author: "JK Rowling", title: "Half-Blood Prince", bookID: 511 },
  { author: "JK Rowling", title: "Deathly Hallows", bookID: 512 },
];

function printsTitles(array) {
  const newArray = array.map((e) => e.title).sort();
  return newArray;
}
console.log(printsTitles(books));
