import {cloneArray} from './function4'

it("should return [1,2] for cloneArray([1,2])", () => {
    expect(cloneArray([1,2])).toEqual([1,2]);
});