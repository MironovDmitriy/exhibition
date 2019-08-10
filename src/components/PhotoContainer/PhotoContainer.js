import React, {PureComponent} from 'react';
import styled from 'styled-components';
import CanvasContainer from './canvas-container';

const MainContainer = styled.div`
	width: 39%;
	background-color: rgba(54, 56, 95);
	z-index: 1;
`;

const TextContainer = styled.div`
	height: 10%;
	background-color: red;
	z-index: 1;
`;

const InfoContainer = styled.div`
	height: 25%;
	background-color: grey;
	z-index: 1;
`;

export default class PhotoContainer extends PureComponent {
	render() {
		return (
			<MainContainer>
				<TextContainer>
				text
				</TextContainer>
				<CanvasContainer />
				<InfoContainer>
					text
				</InfoContainer>
			</MainContainer>
		);
	};
};