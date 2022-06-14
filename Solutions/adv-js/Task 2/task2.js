const fs = {
	name: "alex",
	sub: [{
			name: "rom",
			size: 9,
			sub: [{
					name: "code",
					size: 9,
					sub: [],
				},
				{
					name: "rom",
					size: 9,
					sub: [],
				},
			],
		},
		{
			name: "itamar",
			size: 9,
			sub: [{
					name: "itamar",
					size: 9,
					sub: [],
				},
				{
					name: "code",
					size: 9,
					sub: [],
				},
			],
		},
		{
			name: "idan",
			size: 9,
			sub: [{
					name: "code",
					size: 9,
					sub: [],
				},
				{
					name: "idan",
					size: 9,
					sub: [],
				},
				{
					name: "rom",
					size: 9,
					sub: [],
				},
			],
		},
		{
			name: "yuval",
			size: 9,
			sub: [],
		},
	],
	size: 70,
};

function readTreeRec(fs, repeat) {
	console.log("  ".repeat(repeat), fs.name);
	fs.sub.forEach((child) => {
		readTreeRec(child, repeat);
	});
}
// readTreeRec(fs, 0);

function readTreeLoop(fs) {

	let notVisited = [...fs.sub];
	console.log(fs.name);

	while (notVisited.length) {
		let curr = notVisited.shift();
		notVisited = [...curr.sub, ...notVisited]; // ...[1,2,3]  -> 1,2,3
		console.log(curr.name);
	}

}

// readTreeLoop(fs)


function sum(num) {
	if (num <= 1) {
	  return;
	} else {
	  return num + sum(num - 1);
	}
  }
//   sum(9);
  
  
  function isRec(number)
  {
	if (number < 0) 
	{
	  number = Math.abs(number);
	}
	if (number===0) 
	{
	  return true;
	}
	if (number===1) 
	{
	  return false;
	}
	else 
	{
	  number = number - 2;
	  return isRec(number);
	}
  }



function digitSum(num) {
	if (num / 10 >= 1) return num % 10 + digitSum(Math.floor(num / 10))
	return num
}
// console.log(digitSum(108));