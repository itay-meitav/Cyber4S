"use strict";
function calculateBmi(height, weight) {
    let bmi = weight / ((height / 100) ** 2);
    if (bmi < 18.5) {
        console.log('Underweight (little unhealthy weight)');
    }
    else if (bmi < 25) {
        console.log('Normal (healthy weight)');
    }
    else if (bmi < 30) {
        console.log('Overweight (unhealthy weight)');
    }
    else {
        console.log('Obese (very unhealthy weight)');
    }
    process.argv[2] = height;
    process.argv[3] = weight;
}


calculateBmi(process.argv[2], process.argv[3]);