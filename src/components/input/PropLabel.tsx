import { FC } from "react";
import styled from "styled-components";

export const PropLabel:FC<{
	htmlFor?:string;
	children?:JSX.Element;
}> = props => {
	return (
		<Wrapper>
			<Label
			htmlFor={ props.htmlFor }
			>
				{ props.children }
			</Label>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding:0.5em 0.25em;
	background:rgb(0.5,0.5,0.5);
`;

const Label = styled.label`
	/* font-weight:bold; */
	color:#fff;
	opacity: 0.8;
`;