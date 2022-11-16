import { FC, useState } from "react";
import { Async, GUID } from "../utils";
import { Box } from "./layout";
import styled from "styled-components";
import { ImageUpload } from "./input";

const tabs = [ "Upload", "Web" ];

const URL_PLACEHOLDER = [
	"http://mypixelypixelplace.px/sprite1.png",
	"http://mypixelypixelplace.px/sprite2.jpg",
	"..."
].join("\n");

const DEFAULT_TAB = 0;

enum TabIndex {
	Upload = 0,
	URL = 1,
}

export const ImportImages:FC<{
	onImages:(images:HTMLImageElement[]) => void;
}> = props => {

	// active tab
	const [ tab, setTab ] = useState(DEFAULT_TAB);
	// input data
	const [ text, setText ] = useState("");

	// const [ images, setImages ] = useState<HTMLImageElement[]>([])

	const handleImages = (images:HTMLImageElement[]) => {
		props.onImages(images);
	};

	const dtabs = tabs.map((ttext,i) => {
		return (
			<Tab
			key={ ttext }
			disabled = { i === tab }
			onClick={ () => setTab(i) }
			>
				{ ttext }
			</Tab>
		);
	});

	const fetchImages = async () => {
		const txt = text.trim();
		var urls = txt.split("\n").filter(x => Boolean(x.trim()));

		try {
			var images = await Promise.all(urls.map(x => Async.loadImage(x)));
			handleImages(images);
			setText("");
		}
		catch {}
	};

	const content = tab === TabIndex.URL ? (
		<div
		style={{
			display:"flex",
			height:"100%",
			flexDirection:"column"
		}}
		>
			<TextArea
			value={text}
			className="textarea"
			autoComplete="off"
			spellCheck={false}
			placeholder={ URL_PLACEHOLDER }
			onChange={ e => setText(e.target.value)}
			/>

			<FooterWrapper>
				<FooterButton
				onClick={ fetchImages }
				>
					Fetch
				</FooterButton>
			</FooterWrapper>
		</div>
	) : (
		<>
			<ImageUpload
			multiple
			onImages={ handleImages }
			/>
		</>
	);


	return (
		<Wrapper>
			<TabWrapper>
				{ dtabs }
			</TabWrapper>

			<ContentBox>
				{ content }
			</ContentBox>

			
		</Wrapper>
	);
};

const FooterWrapper = styled.div`
	width:100%;
	display:flex;
	align-items: flex-end;
	margin-top:0.5em;

	justify-content: right;
`;

const FooterButton = styled.div`
	all:unset;

	padding:0.5em 1em;
	cursor:pointer;
	background:#333;
	opacity:0.8;
	color:#fff;
	font-weight:bold;
	&:hover {
		opacity:1;
	}
`;


const Tab = styled.button`
	all:unset;
	padding:0.2em;
	flex:1 1 auto;

	margin:auto;

	display:flex;
	justify-content: center;
	align-content: center;
	padding:0.5em 0;

	color:#fff;

	&:not(:disabled){
		
		opacity:0.5;

		&:hover {
			background:#fff1;
		}
	}

	&:disabled {
		background:#333;
		
	}

	cursor: pointer;

`;

const TabWrapper = styled.div`
	display:flex;
	width:100%;
	justify-content: center;
	align-content: center;
	border:1px solid #333;
	/* border-bottom:0; */
`;

const TextArea = styled.textarea`
	height:100%;
	flex:1 1 auto;
	box-sizing: border-box;
	resize: none;
	width:100%;
	max-width:100%;
	min-width:100%;
	font-size:1em;
	background:#fff0;
	color:#fff;
	border:1px solid #fff3;
	padding:0.5em;

`;

const ContentBox = styled.div`
	height:400px;
	margin-top:0.5em;
`;


const Wrapper = styled.div`
	display:flex;
	flex-direction:column;
	box-sizing: border-box;

	/* textarea {
		
	} */
`;