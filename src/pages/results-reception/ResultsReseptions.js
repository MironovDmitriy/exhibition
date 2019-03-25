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

	getResult() {
		const serverResult = getResponse(window.websocket);
		console.log(serverResult)
		const result = responseData.map(x => x); //позже изменить на получение данных с сервера
		return result;
	};

	renderComponent() {
		const data = this.getResult();

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

