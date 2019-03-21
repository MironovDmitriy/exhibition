import React, {Component} from 'react';
import styled from 'styled-components';
import wsUrl from '../../config/paths';

import Form from './form';
import {ImageContainer} from '../../components';
import {PageContainer as PageContainerMain} from '../../components';

const PageContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 70%;
	margin: 0 40px 0 0;
	border-radius: 5px;
	border: 2px solid #0c4687;
	background-color: rgba(255, 255, 255, 0.2); 
`;

const PhotoFileContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const LabelContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${props => `${props.width}px`};
	height: ${props => `${props.height}px`};
	border: 1px solid #0c4687;
	border-radius: 5px;
	background: #acacac;
	background: -webkit-linear-gradient(bottom, #acacac, #D3D2D2);
	background: -moz-linear-gradient(bottom, #acacac, #D3D2D2);
	background: linear-gradient(to top, #acacac, #D3D2D2);
	-webkit-box-shadow: 2px 4px 13px 0px rgba(50, 50, 50, 0.65);
	-moz-box-shadow:    2px 4px 13px 0px rgba(50, 50, 50, 0.65);
	box-shadow:         2px 4px 13px 0px rgba(50, 50, 50, 0.65);
`;

const WIDTH = 200;
const HEIGHT = 200;

export default class RegistrationForm extends Component {
	constructor() {
		super();

		this.state = {
			fileBase64: '',
		};

		this.getImgSrc = this.getImgSrc.bind(this);
		this.resetImg = this.resetImg.bind(this);
	};

	requestApi(values) {
		const ws = new WebSocket(wsUrl);
		console.log('requestApi')

		ws.onopen = () => console.log('Соединение установлено');

		ws.onclose = (e) => {
			if(e.wasClean) {
				console.log('Закрыто чисто');
			} else {
				console.log('Обрыв соединения');
			}
		console.log(`Код: ${e.code}; Причина: ${e.reason}`);
		};

		ws.onerror = (e) => console.log(e);

		ws.send(values);
	};

	getImgSrc(src) {
		this.setState({fileBase64: src});
	};

	resetImg() {
		this.setState({fileBase64: ''});
	};

	render() {
		const {fileBase64} = this.state;

		return (
			<PageContainerMain>
				<PageContainer>

					<Form
						getImgSrc={this.getImgSrc}
						resetImg={this.resetImg}
						request={this.requestApi}
					/>

					<PhotoFileContainer>
						{fileBase64 ?
							<ImageContainer
								image={fileBase64}
								alt="Загрузка фото"
								width={WIDTH}
								height={HEIGHT}
								isSquare={false}
							/>
						: <LabelContainer
								width={WIDTH}
								height={HEIGHT}
							>
								Место для фото
							</LabelContainer>
						}
					</PhotoFileContainer>

				</PageContainer>
			</PageContainerMain>
		);
	};
};



