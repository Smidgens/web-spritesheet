// smidgens @ github
import { FC, useMemo, useState } from "react";
import {
	Box,
	Dropdown,
	StepSlider,
} from "$components";
import styled from "styled-components";
import { AppView } from "./AppView";
import { SpriteData, SpritesheetSettings } from "./types/sprite";
import { SpriteCanvas } from "$components";
import { NoOp } from "./utils/nsafe";
import { Modal } from "./components/Modal";
import { ImportImages } from "./components/ImportImages";
import { GUID } from "./utils/guid";
import { ArrayHelper } from "./utils/array";

const SPRITESHEET_DEFAULTS:Required<SpritesheetSettings> = {
	resolution:512,
	cols:8,
	antialias:0,
	padding:0
};

const ICONS = {
	DELETE:"╳",
	UP:"🡑",
	DOWN: "🡓"
};

const COLUMN_OPTIONS = ArrayHelper.generate<number>(15, i => i + 2);

// resolution
const SIZE_OPTIONS = ArrayHelper.generate<number>(8, i => Math.pow(2, i + 6));

// const SIZE_OPTIONS = [
// 	64,128,256,512,1024,2048,4096
// ];

const ANTIALIAS_OPTIONS = [
	"off",
	"low",
	"medium",
	"high"
];

export const App:FC = () => {

	// sprite data
	const [ sprites, setSprites ] = useState<SpriteData[]>([]);
	// selected object id
	const [ selection, setSelection ] = useState<string|null>(null);
	// atlas settings
	const [ settings, setSettings ] = useState(SPRITESHEET_DEFAULTS);

	const [ showImport, setShowImport ] = useState(false);

	const colIndex = COLUMN_OPTIONS.indexOf(settings.cols);
	const sizeIndex = SIZE_OPTIONS.indexOf(settings.resolution);

	const handleAddImages = (images:HTMLImageElement[]) => {
		// process images

		setShowImport(false);


		const nsprites:SpriteData[] = images.map(img => {
			return {
				key:GUID.getGUID(),
				src:img.src,
				image:img
			};
		});

		setSprites([
			...sprites,
			...nsprites,
		])
	};

	const handleImport = () => {
		// show modal
		setShowImport(true);
	};

	const handleSelect = (key:string) => {
		setSelection(key);
	};

	// delete sprite
	const handleDelete = (key:string) => {
		const nsprites = sprites.filter(x => x.key !== key);
		setSprites(nsprites);

	};

	// move up/down
	const handleMove = (key:string, dir:number) => {
		const i = sprites.findIndex(x => x.key === key);
		const ni = i + dir;
		if(ni < 0 || ni >= sprites.length){ return; }

		ArrayHelper.swap(sprites, i, ni);

		setSprites([
			...sprites
		]);


	};

	const applySetting = (k:(keyof SpritesheetSettings), v:any) => {
		settings[k] = v;
		setSettings({
			...settings
		});
	}

	const handleSetCols = (optionIndex:number) => {
		const cols = COLUMN_OPTIONS[optionIndex];
		settings.cols = cols;
		setSettings({
			...settings
		});
	};

	const handleSetSize = (optionIndex:number) => {
		const size = SIZE_OPTIONS[optionIndex];
		settings.resolution = size;
		setSettings({
			...settings
		});
	};

	const handleSetAA = (antialias:number) => {
		settings.antialias = antialias;
		setSettings({
			...settings
		});
	};

	const handleSetPadding = (value:number) => {
		applySetting("padding", value);

		// settings.antialias = antialias;
		// setSettings({
		// 	...settings
		// });
	};


	const dsprites = sprites.map((sprite, si) => {
		const img = (
			<ThumbImage
			src={sprite.image.src}
			/>
		);

		const thumb = (
			<ThumbWrapper>
			{ img }
			</ThumbWrapper>
		);

		const content = (
			<ListItemContentWrapper
			className="list-widgets"
			>
				<IcoButton
				text={ ICONS.UP }
				disabled={ si === 0 }
				onClick={ () => handleMove(sprite.key, -1) }
				/>
				<IcoButton
				text={ ICONS.DOWN }
				disabled={ si === sprites.length - 1 }
				onClick={ () => handleMove(sprite.key, 1) }
				/>

				<Box.FlexFill/>


				<IcoButton
				text={ ICONS.DELETE }
				onClick={ () =>  handleDelete(sprite.key)  }
				/>
			</ListItemContentWrapper>
		);

		return (
			<ListItem
			key={ sprite.key }
			active={ selection === sprite.key }
			thumb={ thumb }
			content={ content }
			onClick={ () => handleSelect(sprite.key) }
			/>
			
		);
	});

	const canvasSettingsEdit = (
		<>
			<Dropdown
			label={ <>Resolution</> }
			value={ sizeIndex }
			labels={ SIZE_OPTIONS }
			onSelect={ handleSetSize }
			/>
			<Dropdown
			label={ <>Columns</> }
			value={ colIndex }
			labels={ COLUMN_OPTIONS }
			onSelect={ handleSetCols }
			/>
			<Dropdown
			label={ <>Smoothing</> }
			value={ settings.antialias }
			labels={ ANTIALIAS_OPTIONS }
			onSelect={ handleSetAA }
			/>
			<StepSlider
			label={ <>Padding</> }
			value={ settings.antialias }
			onChange={ handleSetPadding }
			/>
		</>
		
	);


	const importButton = (
		<ImportButton onClick={ handleImport } className="shadow">
			+
		</ImportButton>
	);

	const listArea = (
		<Box.Abs
		style={{
			background:"#222"
		}}
		>
			<Viewbox.Scroll>
				{ dsprites }
			</Viewbox.Scroll>
			{ importButton }
		</Box.Abs>
	);

	// canvas preview area
	const canvas = (
		<Box.Abs className="bg-darkx">
			<SpriteCanvas
			items={sprites}
			settings={settings}
			showGuides
			/>
		</Box.Abs>
	);

	// area below canvas
	const canvasActions = (
		<Box.Abs className="bg-dark">
			<Viewbox.Scroll>
				{ canvasSettingsEdit }
			</Viewbox.Scroll>
		</Box.Abs>
	);

	// properties panel
	const properties = (
		<Box.Abs className="bg-dark">

		</Box.Abs>	
	);

	const importModal = (
		<ImportModal
		show={ showImport }
		onClose={ handleAddImages }
		/>
	);


	return (
		<AppWrapper>

			{ importModal }
			<AppView
			viewports={{
				canvas,
				listArea,
				leftInspector:canvasActions,
				properties
			}}
			/>
		</AppWrapper>
	);
};

const IcoButton:FC<{
	disabled?:boolean;
	text:string;
	onClick:() => void;
}> = props => {

	return (
		<IcoButtonWrapper
		disabled={ props.disabled }
		onClick={ props.onClick }
		>
			<Box.Abs
			style={{
				display:"flex"
			}}
			>
				<div style={{
					margin:"auto"
				}}>
					{ props.text }
				</div>
			</Box.Abs>
		</IcoButtonWrapper>
	);
};


const IcoButtonWrapper = styled.button`
	all:unset;
	position: relative;
	padding:1em;
	/* width:2em !important;
	height:2em !important; */
	/* padding:0.2em; */
	margin:0 0.25em;

	font-weight:bold;

	/* background:#fff; */
	opacity: 0.4;
	/* margin:0.5em; */
	/* display:flex;
	justify-content: center;
	align-items: center; */
	
	border:2px solid #fff;
	color:#fff;
	border-radius:50%;

	&:not(:disabled):hover {
		opacity:1;
	}

	&:disabled {
		pointer-events: none;
		opacity:0.1;
	}

`;


const ListItemContentWrapper = styled(Box.Abs)`
	display:flex;
	align-items:center;
	padding:0 0.5em;
	/* background:red; */

	/* height:100%; */
`;

const ThumbImage = styled.img`

	width:100%;
	height:100%;
	object-fit: contain;
`;

const ThumbWrapper = styled.div`
	width:100%;
	height:100%;
	object-fit: contain;
	/* border-right:1px solid #fff; */
	background:#0003;
`;

const ImportModal:FC<{
	show:boolean;
	onClose:(images:HTMLImageElement[]) => void;
}> = props => {
	
	const handleClose = () => {
		props.onClose([]);
	};

	const handleImages = (images:HTMLImageElement[]) => {
		props.onClose(images);
	};

	return (
		<>
			<Modal
			show={ props.show }
			onClose={ handleClose }
			>
				<ImportImages
				onImages={ handleImages }
				/>

			</Modal>

		</>
	)
};


const AppWrapper = styled(Box.Abs)`
	display:flex;
`;

const Viewbox = {
	Scroll:styled.div`
		overflow:auto;
		position: relative;
		width: 100%;
		height: 100%;

		scrollbar-color: rebeccapurple green;
		scrollbar-width: thin;
	`,
	Truncate:styled(Box.Abs)`
		overflow:hidden;
	`,
};

const ListItem:FC<{
	thumb?:JSX.Element,
	content?:JSX.Element,
	active?:boolean;
	onClick?:() => void,
}> = props => {

	const height = "5em";

	const onClick = props.onClick || NoOp.Arg0;

	const cls = `
		${ props.active ? "active" : "" }
	`;

	return (
		<ListItemWrapper
		className={cls}
		onClick={onClick}
		style={{
			display:"flex",
			position:"relative",
			// marginBottom:"2px"
		}}
		>
			<div
			style={{
				width:height,
				height:height,
				position:"relative"
			}}
			>
				<Box.Abs>
					{ props.thumb }
				</Box.Abs>
			</div>

			<div style={{

				flex:"1 1 auto",
				position:"relative"
			}}
	
			>
				<Box.Abs>
					{ props.content }
				</Box.Abs>

			</div>


		</ListItemWrapper>
	);
};

const ListItemWrapper = styled.div`
	all:unset;
	width:100%;
	cursor:pointer;
	

	
	.list-widgets {
		/* transition:.2s ease-in-out; */
		opacity:0;
	}

	&:hover {
		.list-widgets {
			opacity:1;
		}
	}

	&.active {
		background:rgb(255,255,255,0.03);
	}

	&:not(.active):hover {
		background:rgb(255,255,255,0.01);

	}
`;

const Padded_05 = styled.div`
	width:100%;
	height:100%;
	padding:0.5em;
`;

const OverlayButton = styled.button`
	all:unset;
	position:absolute;
	width:100%;
	height:100%;
	top:0;
	left:0;
	opacity:0;
	z-index:4;
	background:#ffff;
	cursor:pointer;
	&:hover {
		opacity:0.1;
	}
`;


const ImportButton = styled.button`
	all:unset;
	position:absolute;
	margin:0.5em 1em;
	bottom:0;
	left:50%;

	transform:translate(-50%,0);
	
	background:#222;
	font-weight:bold;
	opacity:0.8;
	border-radius:0.5em;
	cursor:pointer;
	font-size:2em;
	padding:0.2em;
	width:3rem;
	height:3rem;
	display:flex;
	align-items: center;
	justify-content: center;

	z-index:10;

	color:#fff;
	border:1px solid #444;

	transform-origin: 50%;;
	
	transition: .1s ease-in-out;

	&:hover {
		opacity:1;
		transform:translate(-50%,0) scale(1.1);

	}
	
`;