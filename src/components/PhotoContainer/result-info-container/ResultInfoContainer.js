import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import smile from 'proj/image/smile-neutrally-big.png';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 25%;
	z-index: 1;
	color: #EEE;
	font-weight: bold;
`;

const TextContainer = styled.div`
	margin: 10px 0 0 0;
	color: #18C0F4;
`;

const ButtonContainer = styled.div`
	margin: 30px 0 0 0;
	display: inline-block;
	width: 235px;
	height: 45px;
	text-align: center;
	line-height: 45px;
	color: #EEE;
	background-color: #36385F;
	border: 2px solid #EEE;
	border-radius: 35px;
	font-weight: bold;

	:hover {
		cursor: pointer;
		color: #36385F;
		background-color: #EEE;
		border-color: #36385F;
	}
`;

export default class ResultInfoContainer extends PureComponent {
	static propTypes = {
		emotion: PropTypes.object.isRequired,
	};

	static propTypes = {
		handleShooting: PropTypes.func.isRequired,
	};

	refreshPage = () => window.location.reload();

	render() {
		const {result} = this.props;

		return (
			<MainContainer>
				<TextContainer>
					<img src={smile} alt='Эмоция' />
				</TextContainer>
				<div>Эмоция:</div>
				<TextContainer>
					{this.props.emotion.value}
				</TextContainer>
				{!result ? (
					<ButtonContainer
						onClick={this.props.handleShooting}
					>
						СДЕЛАТЬ ЕЩЕ ФОТО
					</ButtonContainer>
				) : (
					<ButtonContainer
						onClick={this.refreshPage}
					>
						НОВЫЙ ЧЕЛОВЕК
					</ButtonContainer>
				)}
			</MainContainer>
		);
	};
};