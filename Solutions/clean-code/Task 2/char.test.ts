import { CharArray } from "./task2";
// const CharArray2 = require("./task2");

test("search", () => {
	const charArray = new CharArray("Wakka");
	expect(charArray.search("akka")).toBe(1);
	expect(charArray.search("X")).toBe(-1);
	expect(charArray.search("ka")).toBe(3);

	const charArray2 = new CharArray("Lorem ipsum dolor sit amet");
	expect(charArray2.search("lorem")).toBe(0);
	expect(charArray2.search("ipsum")).toBe(6);
	expect(charArray2.search("dolor")).toBe(12);
	expect(charArray2.search("sit")).toBe(18);
	expect(charArray2.search("amet")).toBe(22);

	const charArray3 = new CharArray("rrrlr");
	expect(charArray3.search("rrlr")).toBe(1);
});

test("sort", () => {
	const charArray = new CharArray("Wakka");
	charArray.sort();
	expect(charArray.getString()).toBe("Waakk");

	const charArray2 = new CharArray("Lorem ipsum dolor sit amet");
	charArray2.sort();
	expect(charArray2.getString()).toBe("eerrttuiiooopassdLlmmm    ");
});

test("reverse", () => {
	const charArray = new CharArray("Wakka");
	charArray.reverse();
	expect(charArray.getString()).toBe("akkaW");

	const charArray2 = new CharArray("Lorem ipsum dolor sit amet");
	charArray2.reverse();
	expect(charArray2.getString()).toBe("tema tis rolod muspi meroL");
});

test("shuffle", () => {
	const charArray = new CharArray("Lorem ipsum dolor sit amet");
	charArray.shuffle();
	expect(charArray.getString()).not.toBe("Lorem ipsum dolor sit amet");

	const charArray2 = new CharArray("Lorem ipsum dolor sit amet");
	charArray2.shuffle();
	expect(charArray2.getString()).not.toBe("Lorem ipsum dolor sit amet");
	expect(charArray2.getString()).not.toBe(charArray.getString());
});
