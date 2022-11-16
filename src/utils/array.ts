// smidgens @ github

// misc array utilities
export class ArrayHelper {

	/**
	 * Swap members of array in place by indices
	 *
	 * @param {any[]} arr Array
	 * @param {number} a Index1
	 * @param {number} b Index2
	 */
	static swap = (arr:any[], a:number, b:number) => {
		var t = arr[a];
		arr[a] = arr[b];
		arr[b] = t;
	};

	
	/**
	 * Generates array of N values
	 *
	 * @template T
	 * @param {number} n
	 * @param {((i:number) => T)} fn
	 * @returns {T[]}
	 */
	static generate = <T>(n:number, fn:((i:number) => T)):T[] => {
		if(n <= 0){ return []; }
		var arr:T[] = [];
		for(let i = 0; i < n; i++){ arr.push(fn(i)); }
		return arr;
	};
}