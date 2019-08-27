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

const ImageContainer = styled(ResultContainer)`
	border: 1px dashed red;
	height: auto;
	position: relative;
	z-index: 2;
`;

const Mask = styled.div`
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	top: ${props => props.top}px;
	left: ${props => props.left}px;
	border: ${props => props.height ? '2px dashed #f0f1f7' : null};
	position: absolute;
	z-index: 2;
`;

export default class PhotoContainer extends PureComponent {
	static propTypes = {
		handleShooting: PropTypes.func.isRequired,
		shooting: PropTypes.bool.isRequired,
		result: PropTypes.object,
		imgSrc: PropTypes.string,
	};

	static defaultProps = {
		imgSrc: '',
		result: {},
	};

	getResult = resultData => {
		if (resultData && resultData.status === 'error') {
			return 'Не удалось распознать фотографию';
		} else if (resultData && resultData.status === 'success') {
				return `${resultData.data.name} ${resultData.data.surname}`;
		}
	};

	render() {
		const {imgSrc, result} = this.props;
		const maskParametrs = result && result.faceRectangle;

		return (
			<MainContainer>
				<UserInfoContainer>
					{result ? this.getResult(result) : 'Имя пользователя'}
				</UserInfoContainer>
					{imgSrc ? (
						<ResultContainer>
							<ImageContainer>
								<Mask
									width={maskParametrs && maskParametrs.width}
									height={maskParametrs && maskParametrs.height}
									top={maskParametrs && maskParametrs.top}
									left={maskParametrs && maskParametrs.left}
								/>
								<img
									width='100%'
									height='auto'
									src={imgSrc}
									alt='Фото'
								/>
							</ImageContainer>
						</ResultContainer>
						) : (
						<CanvasContainer />
					)}
				<ResultInfoContainer
					handleShooting={this.props.handleShooting}
					result={result}
				/>
			</MainContainer>
		);
	};
};