import React, {Component} from 'react';
import styled from 'styled-components';

import Form from './form';
import {ImageContainer} from '../../components';

const PageContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 70%;
	margin: 10px;
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
	border: 1px solid black;
	border-radius: 5px;
	background: #888888;
	background: -webkit-linear-gradient(bottom, #888888, #D3D2D2);
	background: -moz-linear-gradient(bottom, #888888, #D3D2D2);
	background: linear-gradient(to top, #888888, #D3D2D2);
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

	getImgSrc(src) {
		this.setState({fileBase64: src});
	};

	resetImg() {
		this.setState({fileBase64: ''});
	};

	render() {
		const {fileBase64} = this.state;

		return (
			<PageContainer>
				<Form
					getImgSrc={this.getImgSrc}
					resetImg={this.resetImg}
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
		);
	}
}



