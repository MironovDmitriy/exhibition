import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CanvasContainer from './canvas-container';
import ResultInfoContainer from './result-info-container';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
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
		imgSrc: '',
	};

	static propTypes = {
		handleShooting: PropTypes.func.isRequired,
		shooting: PropTypes.bool.isRequired,
		imgSrc: PropTypes.string,
	};

	// onHandleShuting() {
	// 	const {shooting, handleShooting} = this.props;

	// 	handleShooting(!shooting);
	// };

	render() {
		const {imgSrc} = this.props;

		return (
			<MainContainer>
				<UserInfoContainer>
					{this.props.userName}
				</UserInfoContainer>
				{imgSrc ? (
					<img
						width='100%'
						height='auto'
						src={imgSrc}
						alt='Фото'
					/>
					) : (
					<CanvasContainer />
				)}
				<ResultInfoContainer
					handleShooting={this.props.handleShooting}
				/>
			</MainContainer>
		);
	};
};