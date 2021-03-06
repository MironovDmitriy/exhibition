import React from 'react';
import styled from 'styled-components';
import {Menu} from 'proj/components';

const Component = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
	background-color: rgba(54, 56, 95);

	@media screen and (max-width: 900px) {
		flex-direction: column;
		height: 90vh;
	};
`;

const PageContainer = ({children, className}) => (
	<Component className={className}>
		<Menu />
		{children}
	</Component>
);

export default PageContainer;