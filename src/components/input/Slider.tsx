import { GUID, NoOp } from "$utils";
import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Box } from "../layout";
import { PropLabel } from "./PropLabel";


const useDebounce = (value:any, delay:number) => {

	const [ debouncedVal, setDebounced ] = useState(value);

	useEffect(() => {

		const timer = setTimeout(() => setDebounced(value), delay);

		return () => {
			clearTimeout(timer);
		};

	}, [ value, delay ]);

	return debouncedVal;
	
};


export const StepSlider:FC<{
	value?:number;
	onChange?:(v:number) => void;
	label?:JSX.Element;
}> = props => {

	const [ inputValue, setValue ] = useState(props.value || 0);

	const debouncedVal = useDebounce(inputValue, 500);

	const guid = useMemo(GUID.getGUID, []);

	const onChange = props.onChange || NoOp.Arg1;

	useEffect(() => {
		onChange(debouncedVal);
	}, [ debouncedVal ]);


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
				display:"flex"
			}}
			>

				<Input
				id={guid}
				type="range"
				value={inputValue}
				min={0}
				max={0.8}
				step={0.05}
				onChange={ e => setValue(Number(e.target.value)) }
				/>

				<div
				className="bg-dark"
				style={{
					color:"#fff",
					// padding:"0 0.5em",
					width:"3em",
					position:"relative"
				}}
				>
					<Box.Abs
					style={{
						display:"flex"
					}}
					>
						<div
						style={{
							margin:"auto",
							fontSize:"0.8em"
						}}
						>
							{ inputValue }
						</div>
					</Box.Abs>

				</div>

			</div>

		</Wrapper>
	);
};

const Wrapper = styled.div`


`;


const Input = styled.input`
	width:100%;
	box-sizing: border-box;


`;