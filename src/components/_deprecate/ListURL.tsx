import { FC } from "react";
import styled from "styled-components";

export const ListURL:FC<{
	btnText:string;
	value?:string;
	readonly?:boolean;
	onChange?:(v:string) => void;
	onButton?:() => void;
}> = props => {

	const handleButton = () => {
		if(props.onButton){
			props.onButton();
		}
	};

	const handleChange = (v:string) => {
		if(props.onChange){
			props.onChange(v);
		}
	};

	return (
		<Wrapper>
			<input
			value={props.value}
			readOnly={ props.readonly }
			onChange={ e => handleChange(e.target.value) }
			/>

			<button
			onClick={ handleButton }
			>
				{ props.btnText }
			</button>
		</Wrapper>
	)
};


const Wrapper = styled.div`

	display:flex;

	input {
		border-radius: 0;
	}

	button {
		all:unset;
		width:2em;
		display:flex;
		align-items: center;
		justify-content: center;
		/* padding: 0 1em; */
		cursor:pointer;


		&:hover {
			background:#0001;
		}
	}

`;

