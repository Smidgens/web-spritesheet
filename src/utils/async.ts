// smidgens @ github


/**
 * Async resource loading
 *
 * @export
 * @class Async
 * @typedef {Async}
 */
export class Async {

	/**
	 * Loads image from url
	 *
	 * @async
	 * @param {string} src
	 * @returns {Promise<HTMLImageElement>}
	 */
	static loadImage = async (src:string):Promise<HTMLImageElement> => {
		return new Promise<HTMLImageElement>((res, err) => {

			let exited = false;

			const exit = () => {
				if(exited){ return; }
				exited = true;
				err();
			};

			try {
				const img = new Image();
				img.onload = () => res(img);
				img.onerror = exit;
				img.src = src;
				if(img.complete){
					res(img);
				}
				else { setTimeout(exit, 5000); }
			}
			catch{ exit(); }


		});
	};

	private constructor(){}
}