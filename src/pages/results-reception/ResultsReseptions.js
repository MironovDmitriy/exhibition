import React, {Component} from 'react';
import styled from 'styled-components';

import {data as responseData} from './data-test';
import {ResultProfile} from '../../components/';
import {PageContainer as PageContainerMain} from '../../components';
import {getResponse} from '../../api/requestApi';
const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: slex-start;
	width: 70%;
	margin: 0 40px 0 0;
	border-radius: 5px;
	border: 2px solid #0c4687;
	background-color: rgba(255, 255, 255, 0.2);
`;

export default class ResultsReception extends Component {
	constructor() {
		super();

		this.state = {
			results: [],
		};
	};

	componentWillMount() {
		const serverResult = JSON.parse(getResponse(window.websocket));
		console.log(serverResult)
		this.setState({result: serverResult});
	};

	// getResult() {
	// 	const {results} = this.state;

	// 	const result = results.map(x => x);
	// 	return result;
	// };

	renderComponent() {
		const {results} = this.state;
		const data = results;

		const component = data.map((item, index) => {
			return (
				<ResultProfile
					data={item}
					key={index}
					id={index}
				/>
			);
		});

		return component;
	};

	render() {

		return (
			<PageContainerMain>
				<PageContainer>
					{this.renderComponent()}
				</PageContainer>
			</PageContainerMain>
		);
	};
};

