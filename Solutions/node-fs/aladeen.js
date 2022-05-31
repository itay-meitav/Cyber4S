const fs = require('fs');
const path = require('path');

let orig = fs.readFileSync('positive.txt', "utf-8");
console.log(orig.replaceAll(/positive|negative/ig, 'aladeen'));

