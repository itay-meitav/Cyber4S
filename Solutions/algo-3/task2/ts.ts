interface Array<T> {
    peek(): number | null;
}

Array.prototype.peek = function (): number | null {
    return this[this.length - 1] || null;
}

const arr: number[] = [];
arr.push(5);
arr.push(12);
console.log(arr.peek());



function reverse(str: string): string {
    let arr: string[] = [];
    for (let i = 0; i < arr.length; i++) {
        arr.push(str[i]);
    }
    str = '';
    while (arr.length) {
        str += arr.pop();
    }
    return str;
}

let str = "Hello";
console.log(reverse(str));




interface Int16Array {
    push(): Int16Array;
}

function Int16ArrayPush(self: any, ...elements: number[]) {
    return new Int16Array([...self, ...elements]);
}

let typedArray1 = new Int16Array(4);
typedArray1 = Int16ArrayPush(typedArray1, ...[2, 3, 4]);
console.log(typedArray1);