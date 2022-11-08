// smidgens @ github

// guid generator
export class GUID {

	// generate new guid string
	static getGUID = () => SN(8);

	private constructor(){}
}

const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

const SN = (n: number) => {
	return Array.from(new Array(n),(_,i)=>i)
	.map(() => S4())
	.join("")
	.toLowerCase();
};