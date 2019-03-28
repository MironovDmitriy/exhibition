import React, {Component} from 'react';
import styled from 'styled-components';

import {ResultProfile} from '../../components/';
import {PageContainer as PageContainerMain} from '../../components';

const PageContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: slex-start;
	width: 70%;
	margin: 30px 40px 0 0;
	background-color: rgba(255, 255, 255, 0.2);
`;

export default class ResultsReception extends Component {
	static defaultProps = {
		results: null,
	};

	render() {
		const {results} = this.props;

		return (
				<PageContainer>
					<ResultProfile
						results={results}
					/>
				</PageContainer>
		);
	};
};

