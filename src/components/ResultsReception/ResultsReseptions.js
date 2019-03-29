import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {ResultProfile} from '../../components/';

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 600px;
	background-color: rgba(255, 255, 255, 0.2);
`;

export default class ResultsReception extends Component {
	static defaultProps = {
		results: null,
	};

	static propsType = {
		results: PropTypes.object,
	}

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
