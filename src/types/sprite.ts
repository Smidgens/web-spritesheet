// smidgens @ github

const PO2_SIZES = [
	1, 2, 4, 8,
	16, 32, 64, 128,
	256, 512, 1024, 2048,
	4096,
] as const;

// commonly used 2^n
export type PowerOfTwo = typeof PO2_SIZES[number];

export type SpriteData = {
	// unique id for ui
	readonly key:string;
	src:string;
	image:HTMLImageElement;
	// flip image on x/y axes
	flipX?:boolean;
	flipY?:boolean;
	padding?:number;
};

export type SpritesheetSettings = {
	antialias:number;
	resolution:number;
	// number of tiles per row
	cols:number;
};