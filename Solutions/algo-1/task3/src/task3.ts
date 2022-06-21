let arr = [1, 2, 3, 11, 53, 67, 22, 74, 21, 69, 4, 5, 6, 7, 8, 9];

export function bubbleSort(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
        let pass = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                pass = true;
            }
        }
        console.log(arr);

        if (!pass) break;
    }
    return arr;
}

bubbleSort(arr);