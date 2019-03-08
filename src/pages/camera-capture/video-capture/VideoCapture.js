import React, {Component} from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {WIDTH, HEIGHT} from '../../../constants/';

const VideoContainer = styled.div`
	display: flex;
	margin: 3px;
	border: 1px solid black;
`;

export default class VideoCapture extends Component {
	constructor(props) {
		super(props);

		this.errMedia = this.errMedia.bind(this);
		this.succesMedia = this.succesMedia.bind(this);
		this.capture = this.capture.bind(this);
	};

	static propTypes = {
		getSrcImg: PropTypes.func.isRequired,
		photography: PropTypes.bool.isRequired,
	};

	static defaultProps = {
		photography: false,
	};

	componentWillReceiveProps (newProps) {
		const {photography} = newProps;

		if (photography && photography !== this.props.photography) {
			this.capture();
		};
	};

	errMedia () {
		console.log('Ошибка подключения камеры');
	};

	succesMedia () {
		console.log('Камера подключена успешно');
	};

	capture () {
		const {getSrcImg} = this.props;

		const imageSrc = this.refs.webcam.getScreenshot();
		getSrcImg(imageSrc);
	};

	render() {

		return (
			<VideoContainer>
				<Webcam
					audio={false}
					width={WIDTH}
					height={HEIGHT}
					minScreenshotWidth={WIDTH}
					minScreenshotHeight={HEIGHT}
					screenshotFormat={'image/jpeg'}
					onUserMediaError={this.errMedia}
					onUserMedia={this.succesMedia}
					ref={'webcam'}
				/>
			</VideoContainer>
		);
	};
};