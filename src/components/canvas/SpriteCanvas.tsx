// smidgens @ github

import { FC, useEffect, useRef, useState } from "react";
import { Box } from "../layout";
import { SpriteData, SpritesheetSettings } from "$types";
import styled from "styled-components";

const GRID_COLOR = "#fff3";

// index -> column and row
const getXY = (i:number, cols:number):{ x:number,y:number } => {
	const x = i % cols;
	const y = Math.floor(i / cols);
	return { x, y };
};


const getDisplaySprites = (data:SpriteData[]) => {

};

const drawImageTile = (
	ctx:CanvasRenderingContext2D,
	image:HTMLImageElement,
	x:number,
	y:number,
	w:number,
	h:number,
	padding:number
) => {

	const px = padding * w;
	const py = padding * h;
	ctx.drawImage(image, x + px * 0.5, y + py * 0.5, w - px, h - py);
};

const SMOOTHING_OPTIONS = [ "low", "medium", "high" ];

// sprite preview canvas
export const SpriteCanvas:FC<{
	items:SpriteData[];
	settings:SpritesheetSettings;
	showGuides?:boolean;
}> = props => {

	const canvasSize = props.settings.resolution;
	const cols = props.settings.cols;
	const padding = props.settings.padding;

	const showGuides = props.showGuides || false;

	const el = useRef<HTMLCanvasElement>();

	const root = useRef<HTMLElement>();

	// canvas scale inside wrapper
	// const [ scale, setScale] = useState(1);

	const [ wrapperSize, setWrapperSize ] = useState(1);

	const getContext = () => {
		return el.current?.getContext("2d");
	};
	
	useEffect(() => {

		const el = root.current;
		if(!el){ return; }

		setWrapperSize(el.clientWidth);

		const onResize = () => {
			setWrapperSize(el.clientWidth);
		};

		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);

		};
	}, []);

	useEffect(() => {
		var ctx = getContext();
		if(!ctx) { return; }
	}, []);

	useEffect(() => {
		const ctx = getContext();
		if(!ctx){ return; }

		const antialias = props.settings.antialias;

		if(antialias > 0){
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = SMOOTHING_OPTIONS[antialias] as any;
		}else {
			ctx.imageSmoothingEnabled = false;
		}

		ctx.clearRect(0, 0, canvasSize, canvasSize);

		if(props.items.length === 0){ return; }

		var cw = ctx.canvas.width / cols;
		props.items.forEach((item, i) => {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const y = row * cw;
			const x = col * cw;

			let w = cw;
			let h = cw;

			let xo = 0;
			let yo = 0;

			if(item.image.height > item.image.width){
				var t = 1 - (item.image.width / item.image.height);
				var vv = (cw * t);
				xo += (vv) * 0.5;
				w -= vv;
			}

			if(item.image.height < item.image.width){
				var t = 1 - (item.image.height / item.image.width);
				var vv = (cw * t);
				yo += (vv) * 0.5;
				h -= vv;
			}

			drawImageTile(
				ctx,
				item.image,
				x + xo,
				y + yo,
				w,
				h,
				padding
			);

			// ctx.drawImage(item.image, x + xo, y + yo, w, h);

		});

	}, [ props.items, props.settings ]);

	const scale = wrapperSize / canvasSize;

	const guides = showGuides ? (
		<OverlayGrid
		cols={cols}
		color={ GRID_COLOR }
		/>
	) : <></>;

	return (

		<CanvasWrapper
		ref={ root as any }

		className={ `bg-dark` }
		>
			<Canvas
			ref={ el as any }
			width={ canvasSize }
			height={ canvasSize }
			style={{
				transform:`scale(${scale})`
			}}
			>

			</Canvas>

			{ guides }

		</CanvasWrapper>
	)
};


//
const OverlayGrid:FC<{
	cols:number;
	color:string;
}> = props => {

	const color = props.color;

	const ditems:JSX.Element[] = [];
	const cols = props.cols;
	const width = 100 / cols;

	const border = `1px solid ${color}`;

	for(let i = 0; i < cols * cols; i++){
		const { x, y } = getXY(i, cols);

		const xo = x * width;
		const yo = y * width;

		const left = `${xo}%`;
		const top = `${yo}%`;

		

		var item = (
			<Box.Abs
			key={ "cell" + i }
			style={{
				width:`${width}%`,
				height:`${width}%`,
				left,
				top,
				borderLeft:border,
				borderTop:border,
			}}
			>
			</Box.Abs>
		);

		ditems.push(item);
	}

	return (
		<Box.Abs
		style={{
			pointerEvents:"none",
			zIndex:10,
			borderRight:border,
			borderBottom:border,
		}}
		>
			{ ditems }
		</Box.Abs>
	);
};


const CanvasWrapper = styled(Box.Abs)`
	/* width:512px;
	height:512px; */
	/* overflow: hidden; */

	/* width:100%;
	height:100%; */
	/* position:relative; */
	/* border:1px solid black; */
`;




const OverlayWrapper = styled(Box.Abs)`

	border:2px solid black;
	box-sizing: border-box;
`;


const OverlayBorder = styled(Box.Abs)`

	/* border:3px solid black;
	width:calc(100% - 6px);
	height:calc(100% - 6px); */
	/* height:100%; */
	top:0;
	left:0;
	display: inline-block;
	

`;


const Canvas = styled.canvas`
	/* width:100%;
	height:100%; */
	margin:0;
	/* background:purple; */
	position:absolute;
	top:0;
	left:0;
	transform-origin: top left;
	/* display:block; */
`;

