const createArr = (end, random = true) => {
  let arr = [];
  for (let i = 0; i < end; i++) {
    arr.push(random ? Math.floor(Math.random() * end) : i);
  }
  return arr;
};

function linearSearch(arr, value) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}

function binarySearch(arr, value) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] === value) {
      return mid;
    } else if (arr[mid] < value) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(binarySearch(arr, 10));

// let perfomance = require("perf_hooks");
function test(func, arr, value) {
  let start = performance.now();
  func(arr, value);
  let end = performance.now();
  return end - start;
}
// console.log("linear Search", test(linearSearch, arr, 10));
// console.log("binary Search", test(binarySearch, arr, 10));

let timeCount = {
  binary: [],
  linear: [],
  label: [],
};

function measureBinaryTime(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  timeCount.label.push(n);
  let value = Math.floor(Math.random() * n);
  let start = performance.now();
  binarySearch(arr, value);
  let end = performance.now();
  timeCount.binary.push(end - start);
  start = performance.now();
  linearSearch(arr, value);
  end = performance.now();
  timeCount.linear.push(end - start);
}

for (let i = 1; i < 15; i++) {
  measureBinaryTime(i * 1000000);
}
console.log(timeCount);

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: timeCount.label,

    datasets: [
      {
        label: "linear",
        data: timeCount.linear,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "binary",
        data: timeCount.binary,
        fill: false,
        borderColor: "rgb(255, 192, 192)",
        tension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
