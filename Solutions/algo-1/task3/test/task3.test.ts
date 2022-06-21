import { bubbleSort } from "../src/task3";

describe("bubble sort testing", () => {
    it("should return sorted array", () => {
        expect(bubbleSort([7, 2, 41, 12, 5, 45, 23])).toEqual([
            2, 5, 7, 12, 23, 41, 45,
        ]);
    });
});