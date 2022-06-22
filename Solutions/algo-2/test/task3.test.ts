import { quickSort } from "../src/task3";

describe("quick sort testing", () => {
    it("should return sorted array", () => {
        expect(quickSort([7, 2, 41, 12, 5, 45, 23])).toEqual([
            2, 5, 7, 12, 23, 41, 45,
        ]);
    });
});