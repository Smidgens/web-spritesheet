// smidgens @ github

import { FC, useState } from "react";
import { GUID } from "../../utils";
import styled from "styled-components";

// allowed file types
const FILE_ACCEPT = "image/png, image/jpeg";

const BTN_TEXT = "⭱ Upload";

interface IImageUpload {
	multiple?:boolean;
	// onFiles:(files:FileList|null) => void;
	onFiles:(files:HTMLImageElement[]) => void;

}

export const ImageUpload:FC<IImageUpload> = props => {

	// refresh key
	const [ key, setKey ] = useState(GUID.getGUID());

	const loadImage = (file:File):Promise<HTMLImageElement> => {
		return new Promise<HTMLImageElement>((res, err) => {

			var fr = new FileReader();
			fr.onload = (x) => {
				var rr:string = fr.result as any;

				var img = new Image();
				img.src = rr;
				res(img);

			
			};
			
			fr.readAsDataURL(file);
		})


	};


	const handleFiles = async (files:FileList|null) => {

		if(!files){ return; }

		const fl:File[] = [];

		for(let i = 0; i < files.length; i++){
			fl.push(files[i]);
		}

		const images = await Promise.all(fl.map(x => loadImage(x)));

		setKey(GUID.getGUID());

		props.onFiles(images);
	};

	return (
		<Wrapper>
			<FileInput
			type="file"
			multiple={ props.multiple }
			key={ key }
			accept={ FILE_ACCEPT }
			onChange={e => handleFiles(e.target.files)}
			/>
			
			<div className="overlay pabs tl">
				<div className="inner">
					{ BTN_TEXT }
				</div>
			</div>
		
		</Wrapper>

	)
};

const Wrapper = styled.div`

	cursor:pointer;
	position: relative;
	overflow:hidden;

	&:hover {
		.overlay {
			
			.inner {
				transition: .1s ease-in-out;
				border-color:#fff;
			}

		}
	}

	.overlay {
		position: absolute;
		pointer-events: none;
		display:flex;
		
		font-weight:bold;
		color:#fff;
		background:#111;
		
		
		display:flex;
	
		.inner {
			display:flex;
			justify-content: center;
			align-items: center;
			border:1px dashed transparent;
			width:calc(100% - 1em);
			height:calc(100% - 1em);
			margin:auto;
			border-radius: 0.25em;
		}
	}
`;


const FileInput = styled.input`
	width:100%;
	/* border-radius: 0.25em; */
	background:#fff;
	/* border:1px solid #0005; */
	cursor:pointer;
	opacity:0;
	padding:1em;
`;
