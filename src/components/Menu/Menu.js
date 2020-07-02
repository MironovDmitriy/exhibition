import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import CameraIcon from '@atlaskit/icon/glyph/camera';
import JiraCaptureIcon from '@atlaskit/icon/glyph/jira/capture';
import RetryIcon from '@atlaskit/icon/glyph/retry';
import SignOutIcon from '@atlaskit/icon/glyph/sign-out';
import bg from 'proj/image/bg.png';
import logo from 'proj/image/logo.png';
import avatar from 'proj/image/avatar.jpg';
import ButtonBase from 'proj/components/ButtonBase';
import {Avatar} from 'proj/components/index.js';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 22%;
	background-image: url(${props => props.bg});
	background-repeat: round;
	z-index: 1;

	@media screen and (max-width: 900px) {
		display: none;
	};
`;

const BaseContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const TextContainer = styled(BaseContainer)`
	margin: 0 5px 0 5px;
	color: #EEE;
	font-size: ${props => props.fontSize};
	font-variant: ${props => props.fontVariant};
	opacity: ${props => props.opacity};
	text-align: center;
`;

const ButtonFillContainer = styled(ButtonBase)`
	color: #EEE;
	background-color: #5AC3FC;
	border: 2px solid #5AC3FC;

	:hover {
		cursor: pointer;
		color: #EEE;
		background-color: transparent;
		border-color: #EEE;
	}
`;

const Line = styled.div`
	width: 150px;
	border-top: none;
	border-left: none;
	border-right: none;
	border-bottom: 1px solid #EEE;
	opacity: 0.3;
	height: 1px;
`;

const Menu = () => (
	<MainContainer bg={bg}>

		<BaseContainer>
			<TextContainer>
				<JiraCaptureIcon />
			</TextContainer>
			<TextContainer>
				Я ВИЖУ ТЕБЯ
			</TextContainer>
		</BaseContainer>

		<BaseContainer>
			<Line />
		</BaseContainer>

		<BaseContainer>
			<Avatar src={avatar} />
		</BaseContainer>

		<BaseContainer>
			<TextContainer fontSize='0.9em'>
				Сутулов Михаил Вячеславович
			</TextContainer>
		</BaseContainer>

		<BaseContainer>
			<TextContainer fontSize='0.9em' fontVariant='small-caps'>
				Нач. сектора лаборатории цифровая экономика и высокие технологии
			</TextContainer>
		</BaseContainer>

		<NavLink to="/camera" style={{textDecoration: 'none'}}>
			<BaseContainer>
				<ButtonFillContainer>
					<CameraIcon />
					<TextContainer>
						Сделать фото
					</TextContainer>
				</ButtonFillContainer>
			</BaseContainer>
		</NavLink>

		<NavLink to="/history" style={{textDecoration: 'none'}}>
			<BaseContainer>
				<ButtonBase>
					<RetryIcon />
					<TextContainer>
						Работа нейронной сети
					</TextContainer>
				</ButtonBase>
			</BaseContainer>
		</NavLink>

		<NavLink to="/" style={{textDecoration: 'none'}}>
			<BaseContainer>
				<ButtonBase>
					<SignOutIcon />
					<TextContainer>
						ВЫЙТИ
					</TextContainer>
				</ButtonBase>
			</BaseContainer>
		</NavLink>

		<BaseContainer>
			<Line />
		</BaseContainer>

		<BaseContainer>
			<TextContainer>
				<Avatar src={logo} />
			</TextContainer>
		</BaseContainer>

		<BaseContainer>
			<TextContainer fontSize='0.8em' opacity='0.5'>
				(с) 2019. ПУЛЦЭВТ ГУУ
			</TextContainer>
		</BaseContainer>
	</MainContainer>
);

export default Menu;