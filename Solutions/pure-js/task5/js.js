let texts = ["Our supermarket has THE BEST products!", "Free parking for YOU"];

function swapCase(array) {
  let total = [];
  array = array.map((el) => {
    el.split("")
      .map((char) =>
        char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()
      )
      .join("");
  });
  return array;
}
console.log(swapCase(texts));
