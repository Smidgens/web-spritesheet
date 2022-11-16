import { GUID, NoOp } from "$utils";
import { FC, useMemo } from "react";
import styled from "styled-components";
import { Box } from "../layout";
import { PropLabel } from "./PropLabel";

const ICON = "⏷";

interface IProps {
	label?:JSX.Element;
	labels?:any[];
	value?:number; // index
	onSelect?:(index:number) => void;
}

export const Dropdown:FC<IProps> = props => {

	const labels = props.labels || [];

	const onSelect = props.onSelect || NoOp.Arg1;

	const guid = useMemo(GUID.getGUID, []);

	const handleSelect = (i:number) => {
		onSelect(i);
	};
	const doptions = labels.map((label, i)=> {
		return (
			<Option
			key={ "o" + i }
			value={ i }
			>
				{ label }
			</Option>
		);
	});

	const dlabel = props.label ? (
		<PropLabel
		htmlFor={ guid }
		>
			{ props.label }
		</PropLabel>
	) : <></>;

	
	return (
		<Wrapper>

			{ dlabel }
			
			<div
			style={{
				position:"relative"
			}}
			>
				<Select
				id={ guid }
				value={ props.value }
				onChange={ e => {
					if(!Boolean(e.target.value)){ return; }
					handleSelect(Number(e.target.value));
				}}
				>
					{ doptions }
				</Select>
				<Overlay>
					<IconWrapper>
						{ ICON }
					</IconWrapper>
				</Overlay>
			</div>
		</Wrapper>
	);
};


const IconWrapper = styled.div`
	
`;

const Overlay = styled(Box.Abs)`
	pointer-events:none;
	display:flex;
	color:#fff;
	align-items:center;
	justify-content: right;
	padding:0 0.25em;
`;

const Wrapper = styled.div`
	width:100%;
	position:relative;
`;

const Select = styled.select`
	all:unset;
	width:100%;
	color:#fff;
	/* border: 1px solid #fff; */
	padding:0.4em;
	background:#fff2;
	box-sizing: border-box; 
	
	&::after {
		width:50px;
		height:50px;
		content: "-";
	}
`;

const Option = styled.option`
all:unset;
	background:#222;
	border:0;
`;