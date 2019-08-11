import React, {PureComponent} from 'react';
import styled from 'styled-components';
import PhotoCategory from './photo-category';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 27%;
	background-color: #36385F;
`;

export default class PhotoSlider extends PureComponent {
	render() {
		return(
			<MainContainer>
			</MainContainer>
		);
	};
};