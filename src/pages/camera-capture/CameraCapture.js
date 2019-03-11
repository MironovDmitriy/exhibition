import React, {Component} from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import debounce from 'debounce';

import {WIDTH, HEIGHT} from '../../constants/';
import VideoCapture from './video-capture';
import ImageContainer from '../../components/'

import {DELAY} from '../../constants';

const CameraConatiner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: stretch;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 3px;
`

export default class CameraCapture extends Component {
	constructor () {
		super();

		this.state = {
			isImageOpen: false,
			photography: false,
			imgBase64: '',
		};

		this.handleMakePhoto = this.handleMakePhoto.bind(this);
		this.getImgBase64 = this.getImgBase64.bind(this);
	};

	handleMakePhoto () {
		this.setState({
			photography: true,
		});
	};

	getImgBase64 = src => {
		console.log(`Отправляем на бэк изображение в формате base64: ${src}`)
		this.setState({
			imgBase64: src,
			isImageOpen: true,
			photography: false,
		});
	this.debounceChangeComponents();
	};

	changeComponents = state => {
		this.setState({
			isImageOpen: false,
		});
	};

	debounceChangeComponents = debounce(this.changeComponents, DELAY);

	render () {
		const {isImageOpen, photography, imgBase64} = this.state;

		return (
			<CameraConatiner>
				<ButtonContainer>
					<Button
						appearance={'primary'}
						shouldFitContainer={true}
						onClick={this.handleMakePhoto}
					>
						Распознать
					</Button>
				</ButtonContainer>
				{isImageOpen ? 
					<ImageContainer
						image={imgBase64}
						alt="Скриншот"
						width={WIDTH}
						height={HEIGHT}
					/> 
				:
					<VideoCapture
						getSrcImg={this.getImgBase64}
						photography={photography}
					/>
				}
			</CameraConatiner>
		);
	};
};
