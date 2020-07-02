import React from 'react';
import styled from 'styled-components';
import JiraCaptureIcon from '@atlaskit/icon/glyph/jira/capture';
import bg from 'proj/image/bg.png';

const MainContainer = styled.div`
    @media screen and (min-width: 901px) {
        display: none;
    };

	@media screen and (max-width: 900px) {
		display: flex;
        flex-direction: column;
        justify-content: space-around;
		width: 100%;
		height: 10%;		
        background-image: url(${props => props.bg});
		background-repeat: repeat;
	};
`;

const BaseContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const TextContainer = styled.div`
	margin: 5px 0 3px 0;
	color: #EEE;
	font-size: ${props => props.fontSize};
	font-variant: ${props => props.fontVariant};
	opacity: ${props => props.opacity};
	display: flex;
	align-items: center;
`;

const MobileTitle = () => (
	<MainContainer bg={bg}>
		<BaseContainer>
			<TextContainer>
				<JiraCaptureIcon />
				Я ВИЖУ ТЕБЯ
			</TextContainer>
			<TextContainer fontSize='0.6em' opacity='0.5'>
				<a
					href='https://lab.guu.ru/'
				>(с) 2019. ПУЛЦЭВТ ГУУ</a>
			</TextContainer>
		</BaseContainer>
	</MainContainer>
);

export default MobileTitle;