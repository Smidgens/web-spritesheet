import { FC, useEffect, useRef } from "react";
import "./sprite-canvas.css";
import { Async } from "../utils";
import { SpriteInfo } from "../types";


export const SpriteCanvas:FC<{
	items:SpriteInfo[];
	cols:number;
}> = props => {

	const el = useRef<HTMLCanvasElement>();

	const getContext = () => {
		return el.current?.getContext("2d");
	};


	useEffect(() => {
		var ctx = getContext();
		if(!ctx) { return; }
	}, []);


	useEffect(() => {
		const ctx = getContext();
		if(!ctx){ return; }
		
		ctx.clearRect(0, 0, 512, 512);

		if(props.items.length === 0){ return; }

		const cols = props.cols;

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

			// ctx.beginPath();
			// ctx.rect(x, y, cw, cw);
			// ctx.stroke();

			ctx.drawImage(item.image, x + xo, y + yo, w, h);
			

		});

		


	}, [ props.items ]);


	return (

		<div className="sprite-canvas">

			<canvas
			ref={ el as any }
			width={ 512 }
			height={ 512 }
			>

			</canvas>

		</div>
	)
};