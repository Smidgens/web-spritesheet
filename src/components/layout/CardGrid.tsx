// smidgens @ github

import { FC } from "react";
import styled from "styled-components";
import { Box } from "./Box";

const COLUMN_OPTIONS = [
	2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20
] as const;

type ColumnNumber = typeof COLUMN_OPTIONS[number];

interface IGridContainer {
	children?:JSX.Element;
	
}

interface IGridCard {
	children?:JSX.Element|null;
	columns?:ColumnNumber;
}

const DEFAULTS_CARD:Required<IGridCard> = {
	children:null,
	columns:8,
};

/**
 * Components for displaying items in a grid
 *
 * @export
 * @class CardGrid
 * @typedef {CardGrid}
 */
export class CardGrid {

	/**
	 * Container for grid of cards
	 *
	 * @public
	 * @static
	 * @readonly
	 * @type {FC<IGridContainer>}
	 */
	public static get Container():FC<IGridContainer>{
		return GridContainer;
	}

	/**
	 * Card component, used inside Card Container
	 *
	 * @public
	 * @static
	 * @readonly
	 * @type {FC<IGridCard>}
	 */
	public static get Card():FC<IGridCard>{
		return GridCard;
	}

	private constructor(){}
}

const GridContainer:FC<IGridContainer> = props => {
	return (
		<ContainerWrapper>
			{ props.children }
		</ContainerWrapper>
	);
};

const ContainerWrapper = styled.div`
	flex:1 0;
	word-spacing: -1;
`;

const GridCard:FC<IGridCard> = props => {

	const {
		columns
	} = {
		...DEFAULTS_CARD,
		...props,
	};

	return (
		<CardWrapper
		style={{
			width:`${100 / columns}%`
		}}
		>
			<Ratio100></Ratio100>
			
			<Box.Abs
			style={{
				display:"flex",
			}}
			>
				<CardContent
				style={{
					position:"relative",
					margin:"auto"
				}}
				>
					{ props.children }
				</CardContent>
			</Box.Abs>
		</CardWrapper>
	)
};

const CardWrapper = styled.div`
	position:relative;
	display: inline-block;
	vertical-align:bottom;
`;

const Ratio100 = styled.div`
	margin-top:100%;
	position: relative;
	background:green;
`;

const CardContent = styled.div`
	width:90%;
	height:90%;
	position: relative;
	margin:auto;
	border:1px solid #fff5;
	background:#222;
`;