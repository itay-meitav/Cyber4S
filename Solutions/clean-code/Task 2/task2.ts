import { qwerty } from "./qwerty";

export class CharArray {
	input: string[];

	constructor(str: string) {
		this.input = str.split("");
	}

	// Sorts String array by qwerty index.
	sort() {
		let temp: string[] = [];
		let input = this.input;

		// goes through the qwerty array and gets all the characters from input that match the current char forEach qwerty and puts it in the temp array.
		for (const char of qwerty) {
			for (let i = 0; i < input.length; i++) {
				if (input[i].toLowerCase() === char) {
					temp.push(input.splice(i, 1)[0]);
					i--;
				}
			}
		}
		// adds the left out chars that aren't in qwerty to the end of the temp arr.
		temp.push(...input);
		this.input = temp;
	}

	// Shuffles the string array randomly
	shuffle() {
		let input = this.input;
		let i = 0;
		while (i < input.length) {
			let index = Math.floor(Math.random() * input.length);
			// replaces the input[i] with the given random index
			[input[i], input[index]] = [input[index], input[i]];
			i++;
		}
	}

	// Reverses the input array.
	reverse() {
		let l = this.input.length;
		for (let i = 0; i < l / 2; i++) {
			// goes through half the array and mirror replace each cell
			[this.input[i], this.input[l - 1 - i]] = [
				this.input[l - 1 - i],
				this.input[i],
			];
		}
	}

	// Searches the given term withing the input array and return -1 if not found
	search(searchTerm: string) {
		let input = this.input;
		let j = 0;
		// let isOn= false
		for (let i = 0; i < input.length; i++) {
			// If they have a match
			if (input[i].toLowerCase() == searchTerm[j]) {
				// If there is a match to the last location
				if (j == searchTerm.length - 1) {
					return i - j;
				}
				j++;
			} else {
				// If a match has failed in middle of search reset to last place.
				i -= j;
				j = 0;
			}
		}
		return -1;
	}

	// Gets the string of the input array
	getString() {
		return this.input.join("");
	}
}
// const charArray = new CharArray("Wakka");
// charArray.search('lalala');
// console.log(charArray.getString());