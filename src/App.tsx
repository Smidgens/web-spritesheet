import { FC, useState } from "react";
import "./style.css";
import { SpriteCanvas } from "./components/SpriteCanvas";
import { Async, GUID } from "./utils";
import { SpriteInfo } from "./types";

const swap = (arr:any[], a:number, b:number) => {
	var t = arr[a];
	arr[a] = arr[b];
	arr[b] = t;
};



/*
https://csspoint101.com/file-upload-and-image-preview-in-javascript/
*/

export const App:FC = () => {

	const [ sprites, setSprites ] = useState<SpriteInfo[]>([]);
	const [ data, setData ] = useState("");
	const [ files, setFiles ] = useState<FileList|null>(null);



	const appendFile = (file:File) => {
		var fr = new FileReader();


		fr.onload = (x) => {
			var rr:string = fr.result as any;

			var img = new Image();
			img.src = rr;

			sprites.push({
				url:rr,
				image:img
			});

			setSprites([ ...sprites ]);
		};
		
		fr.readAsDataURL(file);

	};

	const deleteAt = (i:number) => {

		setSprites(sprites.filter((s, si) => si != i));

	};


	const shift = (i:number, dir:number) => {

		if(i === 0 && dir < 0){ return; }
		if(i >= sprites.length && dir > 0){ return; }
		
		swap(sprites, i, i + dir);

		setSprites([...sprites]);


	};

	const refreshData = async () => {

		const txt = data.trim();
		var urls = txt.split("\n");

		try {
			var images = await Promise.all(urls.map(x => Async.loadImage(x)));

			setSprites([
				...sprites,
				...images.map(img => ({
					url:img.src,
					image:img
				}))
			])

		}
		catch {}

	};

	const leftIco = "<";
	const rIco = "➜";
	const deleteIco = "✖";

	const [ fileName, setFileName ] = useState("");



	var scards = sprites.map((x,i) => (
		<SpriteCard
		key={ GUID.getGUID() }
		>

			<div className="w100 h100 dflex flexcol">

				<div className="dflex"
				
				style={{
					borderBottom:"1px solid #fff5"
				}}
				>

					<MiniButton
					onClick={() => {
						shift(i, -1);
					}}
					>
						<div
						style={{

							transform:"scaleX(-1)"
						}}
						>
							{ rIco }
						</div>
						
					</MiniButton>
					<MiniButton
					onClick={() => {
						shift(i, 1);
					}}
					>
						{ rIco }
						
					</MiniButton>

					<div className="m-auto">
					</div>

					<MiniButton
					onClick={() => {
						deleteAt(i);
					}}
					>
						{ deleteIco }
					</MiniButton>
				</div>

				<div className="flex10 bg-grayx prel">
					<div className="pabs dflex">
						<img
						src={ x.url }
						className="w100 h100 m-auto ocontain"
						/>
					</div>
				</div>

				<div>

				</div>

			</div>

		</SpriteCard>
	));

	return (
		<div className="app">
			<div className="flex"
			
			>

				<SpriteCanvas
				cols={4}
				items={ sprites }
				/>
				<div style={{
					flex:"1 0",
					background:"#222"
				}}
				className="prel card-container"
				>
					{ scards }

				</div>

			</div>


			<input
			type="file"
			id={ GUID.getGUID()}
			multiple
			// accept="image/png, image/jpeg"
			onChange={e => {

				if(!e.target.files){ return; }

				for(let i = 0; i < e.target.files.length; i++){
					appendFile(e.target.files[i]);
				}
			
				
			}}
			onInputCapture={e => {
				console.log("meh");
			}}
			onBlur={e => {

				console.log(e.target);
				console.log(e.target.files);

			}}
			/>

			<textarea
			value={data}
			className="textarea"
			rows={4}
			onChange={ e => {
				setData(e.target.value);

			} }
	
			/>

			<button
			onClick={ refreshData }
			>
				Load

			</button>

		</div>
	);
};

const SpriteCard:FC<{
	children?:any;
}> = props => {

	return (

		<div className="sprite-card">
			<div className="sprite-inner">
				<div className="pabs dflex" >
					<div className="prel m-auto"
					style={{
						// padding:"5%",
						width:"90%",
						height:"90%",
						// background:"#222",
						border:"1px solid #fff5"
					
					}}
					>
						{ props.children }
					</div>
				</div>
			</div>
			
		</div>	
	)
};


const MiniButton:FC<{
	children?:any;
	onClick:() => void;
	className?:string;
}> = props => {
	
	return (
		<button className={ `mbtn ${props.className}` }
		onClick={ props.onClick }
		>
			{ props.children }
		</button>
	);
};