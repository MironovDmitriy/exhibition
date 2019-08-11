import React from 'react';
import styled from 'styled-components';
import {Avatar} from '../index.js';
import {NavLink} from 'react-router-dom';
import CameraIcon from '@atlaskit/icon/glyph/camera';
import JiraCaptureIcon from '@atlaskit/icon/glyph/jira/capture';
import RetryIcon from '@atlaskit/icon/glyph/retry';
import SignOutIcon from '@atlaskit/icon/glyph/sign-out';
import bg from '../../image/bg.png';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 19%;
	background-image: url(${props => props.bg});
	background-repeat: round;
	padding: 30px;
	z-index: 1;
	font-family: "Russo One";
`;

const ButtonFillContainer = styled.div`
	margin: 30px 0 0 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 45px;
	color: #EEE;
	background-color: #5AC3FC;
	border: 2px solid #5AC3FC;
	border-radius: 35px;

	:hover {
		cursor: pointer;
		color: #EEE;
		background-color: transparent;
		border-color: #EEE;
	}
`;

const ButtonEmptyContainer = styled.div`
	margin: 30px 0 0 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 45px;

	:hover {
		cursor: pointer;
	}
`;

const Container = styled.div`
	display: flex;
	color: #EEE;
`;

const TextContainer = styled.div`
	margin: 0 0 0 10px;
`;

const TransparentContainer = styled.div`
	opacity: 0.3;
	font-size: 0.9em;
`;

const Line = styled.div`
	width: 150px;
	border-top: none;
	border-left: none;
	border-right: none;
	border-bottom: 1px solid #EEE;
	height: 1px;
`;

const Menu = () => (
	<MainContainer bg={bg}>
		<Container>
			<JiraCaptureIcon />
			<TextContainer>
				Я ВИЖУ ТЕБЯ
			</TextContainer>
		</Container>
		<TransparentContainer>
			<Line />
		</TransparentContainer>
		<Container>
			<Avatar />
		</Container>
		<NavLink to="/camera" style={{textDecoration: 'none'}}>
			<ButtonFillContainer>
				<Container>
					<CameraIcon />
					<TextContainer>
						Сделать фото
					</TextContainer>
				</Container>
			</ButtonFillContainer>
		</NavLink>
		<NavLink to="/history" style={{textDecoration: 'none'}}>
			<ButtonEmptyContainer>
				<Container>
					<RetryIcon />
					<TextContainer>
						ИСТОРИЯ
					</TextContainer>
				</Container>
			</ButtonEmptyContainer>
		</NavLink>
		<NavLink to="/camera" style={{textDecoration: 'none'}}>
			<ButtonEmptyContainer>
				<Container>
					<SignOutIcon />
					<TextContainer>
						ВЫЙТИ
					</TextContainer>
				</Container>
			</ButtonEmptyContainer>
		</NavLink>
		<TransparentContainer>
			<Line />
		</TransparentContainer>
		<TransparentContainer>
			<Container>
				(с) 2019. ПУЛЦЭВТ ГУУ
			</Container>
		</TransparentContainer>
	</MainContainer>
);

export default Menu;