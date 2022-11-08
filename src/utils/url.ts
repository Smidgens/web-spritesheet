// smidgens @ github

export class URLUtility {
	static isURL = (path:string) => {
		return path.startsWith("https:");
	};

	static getQueryNumber = (p:URLSearchParams, key:string, d:number):number => {
		const v = p.get(key);
		if(!v){ return d; }
		var pv = Number(v);
		if(Number.isNaN(pv)){ return d; }
		return pv;
	};
}