// smidgens @ github

// math utils
export class Mathf {

	// round to closest power of two
	static nearestPO2 = (v:number) => Math.ceil(Math.log(v)/Math.log(2));

	// clamp value
	static clamp = (v:number, a:number, b:number) => {
		if(v < a){ return a; }
		if(v > b){ return b; }
		return v;
	};

	// clamp value to 0-1 range
	static clamp01 = (v:number) => Mathf.clamp(v, 0, 1);

	private constructor(){}
}