import { FC, useState } from "react";
import { Async, GUID } from "../utils";
import { Box } from "./layout";
import styled from "styled-components";

export const ImportImages:FC<{
	onImages:(images:HTMLImageElement[]) => void;
}> = props => {

	// input data
	const [ text, setText ] = useState("");

	const fetchImages = async () => {
		const txt = text.trim();
		var urls = txt.split("\n").filter(x => Boolean(x.trim()));

		try {
			var images = await Promise.all(urls.map(x => Async.loadImage(x)));
			props.onImages(images);
			setText("");
		}
		catch {}
	};

	return (
		<Wrapper>
			<textarea
			value={text}
			className="textarea"
		
			onChange={ e => setText(e.target.value)}
			/>
			<div style={{ height:"0.2em" }}/>
			<ButtonRow className="footer">
				<button
				onClick={ fetchImages }
				>
					Load
				</button>
			</ButtonRow>
		</Wrapper>
	);
};


const Wrapper = styled.div`
	display:flex;
	flex-direction:column;

	box-sizing: border-box;

	textarea {

	box-sizing: border-box;
		
		/* max-width:500px; */
		resize: none;
		width:100%;
		max-width:100%;
		min-width:100%;
	}

	.footer {
		display:flex;
		align-items: flex-end;
		justify-content: right;
	}
`;

const ButtonRow = styled.div`
	border-bottom:1px solid #fff5;
	display:flex;
`;