"use strict";
function calculateExercises(arr = [3, 0, 2, 4.5, 0, 3, 1], target = 4) {
    const avr = arr.reduce((a, b) => a + b, 0) / arr.length;
    console.log({
        periodLength: arr.length,
        trainingDays: arr.filter((a) => a !== 0).length,
        originalTarget: target,
        averageTime: avr,
        targetWasReached: avr > target,
        Rating: Math.round(avr),
        ratingDescription: avr > target ? "success" : "failure"
    });
    process.argv[2] = arr[0];
    process.argv[3] = arr[1];
    process.argv[4] = arr[2];
    process.argv[5] = arr[3];
    process.argv[6] = arr[4];
    process.argv[7] = arr[5];
    process.argv[8] = arr[6];
}
calculateExercises([process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6], process.argv[7], process.argv[8]]);