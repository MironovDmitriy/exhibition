import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import smile from 'proj/image/smile-neutrally-big.png';
import ButtonBase from 'proj/components/ButtonBase';
import Table from './table';

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

const ButtonContainer = styled(ButtonBase)`
	border: 2px solid #EEE;
	font-weight: 100;

	:hover {
		cursor: pointer;
		color: #36385F;
		background-color: #EEE;
		border-color: #36385F;
	}
`;

export default class ResultInfoContainer extends PureComponent {
	static propTypes = {
		handleShooting: PropTypes.func.isRequired,
		result: PropTypes.object,
	};

	static defaultProps = {
		result: {},
	};

	refreshPage = () => window.location.reload();

	render() {
		const {result} = this.props;

		return (
			<MainContainer>
				<TextContainer>
					<img src={smile} alt='Смайлик эмоция' />
				</TextContainer>
				<Table
					data={result}
				/>
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