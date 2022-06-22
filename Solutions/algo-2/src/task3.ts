// 5 3 8 4 6 1 7
/*
5 3 8 4 6 1 7
4 3 1 5 6 8 7
-
1 3 4 5 6 1 7
1 3 4 5 6 7 8
*/


// 1 3 4 5 6 7 8
/*
1 3 4 5 6 7 8
*/


// 8 7 6 5 4 3 1
/*
8 1 6 5 4 3 7
8 1 3 5 4 6 7
8 1 3 4 5 6 7
1 3 4 5 6 7 8
*/

let arr = [1, 3, 4, 5, 8, 9, 2, 7, 6];
export function quickSort(array: number[]): number[] {
    if (array.length == 1) {
        return array;
    }
    const pivot = array[array.length - 1];
    const leftArr = [];
    const rightArr = [];
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < pivot) {
            leftArr.push(array[i]);
        } else {
            rightArr.push(array[i]);
        }
    }

    if (leftArr.length > 0 && rightArr.length > 0) {
        return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
    } else if (leftArr.length > 0) {
        return [...quickSort(leftArr), pivot]
    } else {
        return [pivot, ...quickSort(rightArr)]
    }
}
console.log(quickSort(arr));

