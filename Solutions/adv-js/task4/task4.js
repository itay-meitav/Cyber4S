let a = 10;
let b;
if (a === 1) {
	b = a * 2;
} else if (a === 2) {
	b = a ** 2;
} else if (a === 3) {
	b = a * 10;
} else {
	b = 1;
}






a = 10;

function switchLikeFunc(a) {
	if (a === 1) {
		return a * 2;
	}
	if (a === 2) {
		return a ** 2;
	}
	if (a === 3) {
		return a * 10;
	}
	return 1;
}
b = switchLikeFunc(a);






a = 10;
switch (a) {
	case 1:
		b = a * 2;
		break;
	case 2:
		b = a ** 2;
		break;
	case 3:
		b = a * 10;
		break;
	default:
		b = 1;
}

let obj = {
	1: 2,
	2: 4,
	3: 30
}

b = obj[a] || 1

console.log(b);