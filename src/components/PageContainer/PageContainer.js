import React from 'react';
import styled from 'styled-components';
import {Menu} from '../';

const Component = styled.div`
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
	background: #3A6080;
	background: linear-gradient(to top, #3A6080, #4090D2);
	height: 100vh;
`;

const PageContainer = ({children, className}) => (
	<Component className={className}>
		<Menu />
		{children}
	</Component>
);

export default PageContainer;