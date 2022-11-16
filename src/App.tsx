// smidgens @ github

import { FC, useState } from "react";
import { Box } from "$components";
import styled from "styled-components";
import { AppView } from "./AppView";
import { SpriteData, SpritesheetSettings } from "./types/sprite";
import { SpriteCanvas } from "$components";

const SPRITESHEET_DEFAULTS:Required<SpritesheetSettings> = {
	resolution:512,
	cols:8
};

// dummy data to test overflow
const dummyElements:JSX.Element[] = [];
for(let i = 0; i < 100; i++){
	dummyElements.push((
	<div key={ "item" + i }>
		{ "crap" + i }
	</div>));
}

export const App:FC = () => {

	// sprite data
	const [ sprites, setSprites ] = useState<SpriteData[]>([]);
	// selected object id
	const [ selection, setSelection ] = useState<string|null>(null);
	// atlas settings
	const [ settings, setSettings ] = useState(SPRITESHEET_DEFAULTS);

	const listArea = (
		<Box.Abs className="bg-orange">
			<Viewbox.Scroll>
				{ dummyElements }
			</Viewbox.Scroll>
		</Box.Abs>
	);

	// canvas preview area
	const canvas = (
		<Box.Abs className="bg-green">
			<SpriteCanvas
			items={sprites}
			settings={settings}
			/>
		</Box.Abs>
	);

	// area below canvas
	const canvasActions = (
		<Box.Abs className="bg-purple">

		</Box.Abs>	
	);

	// properties panel
	const properties = (
		<Box.Abs className="bg-blue">

		</Box.Abs>	
	);

	return (
		<AppWrapper>
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

const AppWrapper = styled(Box.Abs)`
	display:flex;
`;

const Viewbox = {
	Scroll:styled.div`
		overflow:auto;
		position: relative;
		width: 100%;
		height: 100%;
	`,
	Truncate:styled(Box.Abs)`
		overflow:hidden;
	`,
};

