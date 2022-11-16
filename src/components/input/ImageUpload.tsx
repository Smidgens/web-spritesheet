// smidgens @ github

import { FC, useState } from "react";
import { GUID } from "../../utils";
import styled from "styled-components";
import { Box } from "../layout";

const IMAGE_TYPES = [
	"png",
	"jpg",
	"jpeg",
	"ico",
	"webp",
].map(x => `image/${x}`);


// allowed file types
// const FILE_ACCEPT = "image/png, image/jpeg, image/ico, image/webp";
const FILE_ACCEPT = IMAGE_TYPES.join(", ");


const BTN_TEXT = "Select files";

interface IImageUpload {
	multiple?:boolean;
	// onFiles:(files:FileList|null) => void;
	onImages:(files:HTMLImageElement[]) => void;
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

		props.onImages(images);
	};

	return (
		<Wrapper
		>

			<DisplayOverlay
			className="overlay border"
			>
			
			</DisplayOverlay>

			<OverlayText>
					{ BTN_TEXT }
			</OverlayText>

			<Box.Abs>
				<FileInput
				type="file"
				multiple={ props.multiple }
				key={ key }
				accept={ FILE_ACCEPT }
				onChange={e => handleFiles(e.target.files)}
				/>
			</Box.Abs>
			
			
		
		</Wrapper>

	)
};

const DisplayOverlay = styled(Box.Abs)`
	pointer-events: none;
	border:2px dashed #fff;
	display:flex;
	align-items: center;
	justify-content: center;
	font-size:2em;
`;


const OverlayText = styled(Box.Abs)`
	pointer-events: none;
	display:flex;
	align-items: center;
	justify-content: center;
	font-size:2em;
`;


const Wrapper = styled.div`

	cursor:pointer;
	position: relative;
	overflow:hidden;
	width:100%;
	height:100%;

	color:#fff;

	.overlay.border {
		opacity:0.3;
	}

	&:hover {
		.overlay.border {
			opacity:0.8;
		}
	}

	
`;


const FileInput = styled.input`
	width:100%;
	height:100%;
	/* border-radius: 0.25em; */
	background:#fff;
	/* border:1px solid #0005; */
	cursor:pointer;
	opacity:0;
	padding:1em;
`;
