import React, {PureComponent} from 'react';
import styled from 'styled-components';
import Avatar from '@atlaskit/avatar';

const AvatarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 30px 0 0 0;
`;

const TextContainer = styled.div`
	margin: 20px 0 0 0;
	color: #EEE;
`;

export default class AvatarComponent extends PureComponent {
	render() {
		return (
			<AvatarContainer>
				<Avatar
					appearance="circle"
					size="xlarge"
				/>
				<TextContainer>
					Имя пользователя
				</TextContainer>
			</AvatarContainer>
		);
	};
};