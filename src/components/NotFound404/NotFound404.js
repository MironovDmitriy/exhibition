import React from 'react';
import styled from 'styled-components';

const ComponentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	background: #3A6080;
	background: linear-gradient(to top, #3A6080, #4090D2);
	height: 100vh;
`;

const NotFound404 =({location}) => (
	<ComponentContainer className="notFound">
		<h2>Страница по адресу {location.pathname} не найдена</h2>
	</ComponentContainer>
);

export default NotFound404;