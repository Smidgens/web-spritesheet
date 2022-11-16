// smidgens @ github

import { NoOp } from "$utils";
import { FC } from "react";
import styled from "styled-components";
import { Box } from "./layout";
type CloseHandler = () => void;

interface IModal {
	show?:boolean;
	children?:JSX.Element;
	onClose?:CloseHandler;
}

export const Modal:FC<IModal> = props => {

	const cls = `
		${ props.show ? "show" : ""}
	`.trim();

	const onClose = props.onClose || NoOp.Arg0;

	const handleClose = () => onClose();

	const cl = props.show ? (
		<ContentLayer>
				<ContentContainer>
					{ props.children }
				</ContentContainer>
			</ContentLayer>
	) : <></>;

	return (
		<ModalRoot className={ cls }>
			<Backdrop onClick={handleClose}/>
			{cl}
		</ModalRoot>
	);

};


const ModalRoot = styled.div`

	position:fixed;
	width:100%;
	height:100%;
	z-index:10;
	pointer-events: all;

	&:not(.show) {
		opacity:0;
		pointer-events:none;
	}

	display:flex;
	flex-direction:column;

	.header {
		background:orange;
	}

	.content {
		flex:1 1;
	}

`;

const ContentContainer = styled.div`
	width:50%;
	margin: auto;
	background:#fff;
	padding:0.5em;
	pointer-events: all;
`;

const Backdrop = styled(Box.Abs)`
	background:#0009;
`;

const ContentLayer = styled(Box.Abs)`
	pointer-events: none;
	display:flex;
`;