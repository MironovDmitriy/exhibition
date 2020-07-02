import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CanvasContainer from './canvas-container';
import ResultInfoContainer from './result-info-container';
import smile from 'proj/image/smile-neutrally-big.png';
import {Spinner} from 'proj/components';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 39%;
	background-color: rgba(54, 56, 95);
	z-index: 1;

	@media screen and (max-width: 900px) {
		width: 100%;
		height: 20vh;
		z-index: 0;
		position: absolute;
		top: 75%;
		left: 0px;
	};
`;

const UserInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 10%;
	z-index: 1;
	color: #FFF;

	@media screen and (max-width: 900px) {
		display: none;
		z-index: 0;
	};
`;

const MobileUserInfoContainer = styled(UserInfoContainer)`
	@media screen and (max-width: 900px) {
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 20%;
		margin: 15px 0 0 0;
	};
`;

const ResultContainer = styled(UserInfoContainer)`
	height: 65%;
	z-index: 1;

	@media screen and (max-width: 900px) {
		display: none;
		z-index: 0;
	};
`;

const TextContainer = styled.div`
	margin: 10px 5px 0 5px;
	color: #EEE;
`;

export default class PhotoContainer extends PureComponent {
	static propTypes = {
		handleShooting: PropTypes.func.isRequired,
		shooting: PropTypes.bool.isRequired,
		fetching: PropTypes.bool.isRequired,
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
		const {photo, result, handleShooting, fetching} = this.props;

		return (
			<MainContainer>
				{fetching ? (
					<UserInfoContainer>
						<Spinner />
					</UserInfoContainer>
				) : (
					<MobileUserInfoContainer>
						<TextContainer>
							{result ? this.showUserName(result) : 'Имя пользователя'}
						</TextContainer>
						<TextContainer>
							<img src={smile} alt='Смайлик эмоция' />
						</TextContainer>
							
						
					</MobileUserInfoContainer>
				)}
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
					fetching={fetching}
				/>
			</MainContainer>
		);
	};
};