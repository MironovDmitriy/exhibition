import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import smile from 'proj/image/smile-neutrally-big.png';
import {Spinner} from 'proj/components';
import Table from './table';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 25%;
	z-index: 1;
	color: #EEE;
	font-weight: bold;

	@media screen and (max-width: 900px) {
		height: 100%;
		z-index: 0;
	};
`;

const TextContainer = styled.div`
	margin: 10px 0 0 0;
	color: #18C0F4;
`;

export default class ResultInfoContainer extends PureComponent {
	static propTypes = {
		handleShooting: PropTypes.func.isRequired,
		fetching: PropTypes.bool.isRequired,
		result: PropTypes.object,
	};

	static defaultProps = {
		result: {},
	};

	refreshPage = () => window.location.reload();

	render() {
		const {result, fetching} = this.props;

		return (
			<MainContainer>
				<Table
					data={result}
				/>
				{fetching && (
					<Spinner />
				)}
			</MainContainer>
		);
	};
};