import React, {Component} from 'react';
import styled from 'styled-components';

import Form from './form';
import {ImageContainer} from '../../components';

const PageContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	margin: 10px;
	border: 1px dashed black;
`;

const PhotoContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export default class RegistrationForm extends Component {
	constructor() {
		super();

		this.state = {
			fileBase64: '',
		};

		this.getImgSrc = this.getImgSrc.bind(this);
	};

	getImgSrc(src) {
		this.setState({
			fileBase64: src,
		});
	};

	render() {
		const {fileBase64} = this.state;

		return (
			<PageContainer>
				<Form 
					getImgSrc={this.getImgSrc}
				/>

				<PhotoContainer>
					<div>Место для фото</div>
					{fileBase64 &&
						<ImageContainer
							image={fileBase64}
							alt="Загрузка фото"
							width="250"
							height="250"
					/>}
				</PhotoContainer>
			</PageContainer>
		);
	}
}



