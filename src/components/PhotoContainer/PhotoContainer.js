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
	color: #FFF;
	font-weight: bold;
`;

export default class PhotoContainer extends PureComponent {
	static propTypes = {
		handleShooting: PropTypes.func.isRequired,
		shooting: PropTypes.bool.isRequired,
		imgSrc: PropTypes.string,
	};

	// onHandleShuting() {
	// 	const {shooting, handleShooting} = this.props;

	// 	handleShooting(!shooting);
	// };

	getResult = resultData => {
		if (resultData && resultData.status === 'error') {
			return 'Не удалось распознать фотографию';
		} else if (resultData && resultData.status === 'success') {
				return `${resultData.data.name} ${resultData.data.surname}`;
		}
	};

	render() {
		const {imgSrc, result} = this.props;
		console.log(result)
		return (
			<MainContainer>
				<UserInfoContainer>
					{result ? this.getResult(result) : 'Имя пользователя'}
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