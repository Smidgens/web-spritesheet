import { FC } from "react";
import "./list-url.css";

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

		<div className="list-url flex">
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
		</div>
	)
};