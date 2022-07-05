export interface ITree {
	name: string;
	sub: ITree[];
	size: number;
}

export const tree: ITree = {
	name: "/",
	sub: [
		{
			name: "rom",
			size: 9,
			sub: [
				{
					name: "code",
					size: 9,
					sub: [],
				},
				{
					name: "rom",
					size: 9,
					sub: [
						{
							name: "code",
							size: 9,
							sub: [],
						},
					],
				},
			],
		},
		{
			name: "itamar",
			size: 9,
			sub: [
				{
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
			sub: [
				{
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
