// smidgens @ github

import { FC } from "react";
import { Box } from "$components";
import styled from "styled-components";

// constants
const CFG = {
	PREVIEW_WIDTH:20,
	INSPECTOR_WIDTH:20,
};

interface IProps {
	debug?:boolean;
	// content to insert into different viewports
	viewports?:{
		canvas?:JSX.Element,
		// center
		listArea?:JSX.Element,
		leftInspector?:JSX.Element,
		properties?:JSX.Element,
	}
}

/**
 * Layout handler for various viewports
 */
export const AppView:FC<IProps> = props => {

	const viewports = props.viewports || {};

	const cls = `
	${ props.debug ? "debug" : "" }
	`;

	// [canvas] [list] [inspector]
	return (
		<AppWrapper className={ cls }>
			<ViewColumns.Left className="cl">
				<Box.Ratio className="canvas">
					<Truncate>
						{ viewports.canvas }
					</Truncate>
				</Box.Ratio>
				<Box.FlexFill className="inspector">
					<Truncate>
						{ viewports.leftInspector }
					</Truncate>
				</Box.FlexFill>
			</ViewColumns.Left>

			<ViewColumns.Center className="cc">
				<Truncate>
					{ viewports.listArea }
				</Truncate>
			</ViewColumns.Center>

			<ViewColumns.Right className="cr">
				<Truncate>
					{ viewports.properties }
				</Truncate>
			</ViewColumns.Right>

		</AppWrapper>
	);
};

const AppWrapper = styled(Box.Abs)`
	display:flex;
	&.debug {
		.cl {
			background:yellow;
			.canvas { background:blue; }
			.inspector { background:magenta; }
		}
		.cc { background:orange; }
		.cr {
			background:purple;
		}
	}
`;

// root row
const ViewColumns = {
	Left:styled.div`
		width:${CFG.PREVIEW_WIDTH}%;
		height:100%;
		display:flex;
		flex-direction: column;
		position:relative;
	`,
	Center:styled.div`
		flex:1 1 auto;
		position:relative;
	`,
	Right:styled.div`
		width:${CFG.PREVIEW_WIDTH}%;
		height:100%;
		position:relative;
	`,
};

const Viewbox = {
	Truncate:styled(Box.Abs)`
		overflow:hidden;
	`,
};


const Truncate = styled(Box.Abs)`
	overflow:hidden;
`;