import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 5px;
	border: 2px solid #0c4687;
	background-color: rgba(255, 255, 255, 0.2);
	padding: 30px;
`;

const LinkContainer = styled.div`
	background: rgb(203,203,203);
	background: linear-gradient(225deg, rgba(203,203,203,1) 0%, rgba(199,199,199,1) 100%);
	margin: 10px 0;
	border: 1px solid #0c4687;
	border-radius: 5px;
	padding: 10px 40px;
	text-decoration: none;
	text-align: center;

	:hover {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), inset 0 0 1px rgba(255, 255, 255, 0.6);
		background: rgba(203,203,203, 0.7);
		background: linear-gradient(225deg, rgba(203,203,203, 0.8) 0%, rgba(199,199,199, 0.8) 100%);
		color: rgba(0, 0, 0, 0.7);
	}
`;

const Menu = () => (
	<MainContainer>

		<NavLink to="/" style={{textDecoration: 'none'}}>
			<LinkContainer>
				Регистрация
			</LinkContainer>
		</NavLink>

		<NavLink to="/camera" style={{textDecoration: 'none'}}>
			<LinkContainer>
				Сделать фото
			</LinkContainer>
		</NavLink>

	</MainContainer>
);

export default Menu;