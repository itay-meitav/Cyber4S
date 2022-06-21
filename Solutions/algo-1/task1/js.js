let n = 16;

// #1.1
for (let i = 0; i < n; i++) {
  for (let k = 0; k < n; k++) {
    console.log(i + " " + k);
  }
}

// Space = O(1)
// O(n^2)

// #1.2
function printMe(i, n) {
  for (let k = 0; k < n; k++) {
    console.log(i + " " + k);
  }
}
for (let i = 0; i < n; i++) {
  printMe(i, n);
}

// Space = O(1)
// O(n^2)

// #1.3
// let i = 0;
while (i < n) {
  i = i + 1;
  console.log(i);
}

// O(n)

// #1.4

// let i = 0;
while (i < n) {
  i = i + 2;
  console.log(i);
}

// half the time
// O(n/2)

// #1.5

// let i = 0;
while (i < n) {
  i = i + 0.1;
  console.log(i);
}

// 10 times the time
// O(n*10)

// #1.6
// let i = 2;
while (i < n) {
  i = i * i;
  console.log(i);
}

// O(n^0.5)
// O(1)

// #1.7

let i = 0;
while (i < n) {
  i = i + 1;
  console.log(i);
}

// O(n) - Run Time
// O(1) - Space

let k = 2;
while (k < n) {
  k = k * k;
  console.log(k);
}

// O(n^0.5) - Run Time
// O(1) - Space
