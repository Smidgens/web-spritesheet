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
}