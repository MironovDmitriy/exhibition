import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CanvasContainer from './canvas-container';
import ResultInfoContainer from './result-info-container';

const MainContainer = styled.div`
	width: 39%;
	background-color: rgba(54, 56, 95);
	z-index: 1;
`;

const UserInfoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 10%;
	z-index: 1;
	color: #eee;
	font-weight: bold;
`;

export default class PhotoContainer extends PureComponent {

	static defaultProps = {
		userName: 'Имя пользователя',
	};

	static propTypes = {
		handleShooting: PropTypes.func.isRequired,
	};

	render() {
		return (
			<MainContainer>
				<UserInfoContainer>
					{this.props.userName}
				</UserInfoContainer>
				<CanvasContainer />
				<ResultInfoContainer
					handleShooting={this.props.handleShooting}
				/>
			</MainContainer>
		);
	};
};