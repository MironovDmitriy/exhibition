import React, {PureComponent} from 'react';
import styled from 'styled-components';
import Avatar from '@atlaskit/avatar';
import avatar from 'proj/image/avatar.jpg';

const AvatarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px 0 0 0;
`;

const TextContainer = styled(AvatarContainer)`
	justify-content: center;
	margin: 0;
	padding: 7px 0 0 0;
	font-size: 0.85em;
	color: #EEE;
`;

export default class AvatarComponent extends PureComponent {
	render() {
		return (
			<AvatarContainer>
				<Avatar
					appearance="circle"
					size="xlarge"
					src={avatar}
				/>
				<TextContainer>
					<TextContainer>Сутулов Михаил Вячеславович</TextContainer>
					<br />
					<TextContainer>Нач. сектора лаборатории</TextContainer>
					<TextContainer>цифровая экономика и</TextContainer>
					<TextContainer>высокие технологии</TextContainer>
				</TextContainer>
			</AvatarContainer>
		);
	};
};