// smidgens @ github

import { FC } from "react";
import styled from "styled-components";

export const TButton:FC<{
	children?:any;
	onClick:() => void;
	className?:string;
	disabled?:boolean;
	mirror?:boolean;
}> = props => {

	const cls = `mbtn ${props.className}`;
	
	return (
		<Button
		disabled={ props.disabled }
		className={ cls }
		onClick={ props.onClick }
		>
			<div
			style={props.mirror ? {

				transform:"scaleX(-1)"
			} : {}}
			>
				{ props.children }
			</div>
			
		</Button>
	);
};

const Button = styled.button`
	all:unset;
	cursor:pointer;
	padding:0.1em 0.3em;
	font-weight:bold;
	color:#fff;

	&:hover {
		background:#444;
	}
`;
