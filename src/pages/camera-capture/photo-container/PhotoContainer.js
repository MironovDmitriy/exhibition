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
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 10%;
	z-index: 1;
	color: #FFF;
`;

const ResultContainer = styled(UserInfoContainer)`
	height: 65%;
	z-index: 1;
`;

export default class PhotoContainer extends PureComponent {
	static propTypes = {
		handleShooting: PropTypes.func.isRequired,
		shooting: PropTypes.bool.isRequired,
		result: PropTypes.object,
		photo: PropTypes.string,
	};

	static defaultProps = {
		photo: '',
		result: {},
	};

	showUserName = resultData => {
		if (resultData && resultData.status === 'error') {
			return 'Не удалось распознать фотографию';
		} else if (resultData && resultData.status === 'success') {
				return `${resultData.data.name} ${resultData.data.surname}`;
		}
	};

	render() {
		const {photo, result, handleShooting} = this.props;

		return (
			<MainContainer>
				<UserInfoContainer>
					{result ? this.showUserName(result) : 'Имя пользователя'}
				</UserInfoContainer>
					{!photo ? (
						<CanvasContainer />
						) : (
						<ResultContainer>
							<img
								width='100%'
								height='auto'
								src={photo}
								alt='Фото'
							/>
						</ResultContainer>
					)}
				<ResultInfoContainer
					handleShooting={handleShooting}
					result={result}
				/>
			</MainContainer>
		);
	};
};