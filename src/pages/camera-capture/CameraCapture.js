import React, {Fragment, Component} from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import VideoCapture from './video-capture';
import {WIDTH, HEIGHT} from '../../constants';

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
			isOpenPhoto: false,
			photography: false,
			imgSrc: '',
		};

		this.getPhoto = this.getPhoto.bind(this);
		this.getImgSrc = this.getImgSrc.bind(this);
	};

	getPhoto () {
		this.setState({
			photography: true,
			isOpenPhoto: true,
		});
		// const img = this.getImgSrc();
		// console.log(img)
	};

	getImgSrc (src) {
		console.log(src)
		this.setState({imgSrc: src});
	};

	render () {
		const {isOpenPhoto, photography} = this.state;
console.log(this.state)
		return (
			<CameraConatiner>
				<ButtonContainer>
					<Button
						appearance={'primary'}
						shouldFitContainer={true}
						onClick={this.getPhoto}
					>
						Распознать
					</Button>
				</ButtonContainer>
					<VideoCapture
						getSrcImg={this.getImgSrc}
						photography={photography}
					/>
					<img width={WIDTH} height={HEIGHT} src={this.props.imgSrc} />
			</CameraConatiner>
		);
	};
};
