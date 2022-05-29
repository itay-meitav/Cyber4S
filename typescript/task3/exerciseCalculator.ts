interface Data {
    periodLength: number;
    trainingDays: number;
    originalTarget: number;
    averageTime: number;
    targetWasReached: boolean;
    Rating: number;
    ratingDescription: string;
}

function calculateExercises (arr = [3, 0, 2, 4.5, 0, 3, 1], target = 4): Data {
    const avr = arr.reduce((a, b) => a + b, 0) / arr.length;
    return {
        periodLength: arr.length,
        trainingDays: arr.filter((a) => a !== 0).length,
        originalTarget: target,
        averageTime:  avr,
        targetWasReached: avr > target,
        Rating: Math.round(avr),
        ratingDescription: avr > target ? "success" : "failure"
    };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));

