import React, {Component} from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {WIDTH, HEIGHT} from '../../../constants/';

const VideoContainer = styled.div`
	display: flex;
	margin: 3px auto;
	border: 1px solid black;
`;

export default class VideoCapture extends Component {
	constructor(props) {
		super(props);

		this.webcam = React.createRef();

		this.errCameraConnection = this.errCameraConnection.bind(this);
		this.capture = this.capture.bind(this);
	};

	static propTypes = {
		getPhotoUrl: PropTypes.func.isRequired,
		shooting: PropTypes.bool.isRequired,
	};

	static defaultProps = {
		shooting: false,
	};

	componentWillReceiveProps (newProps) {
		const {shooting} = newProps;

		if (shooting && shooting !== this.props.shooting) {
			this.capture();
		};
	};

	errCameraConnection () {
		console.log('Ошибка подключения камеры');
	};

	capture () {
		const {getPhotoUrl} = this.props;

		const photoUrl = this.webcam.current.getScreenshot();
		getPhotoUrl(photoUrl);
	};

	render() {

		return (
			<VideoContainer>
				<Webcam
					audio={false}
					width={WIDTH}
					height={HEIGHT}
					screenshotFormat={'image/jpeg'}
					onUserMediaError={this.errCameraConnection}
					onUserMedia={this.succesMedia}
					ref={this.webcam}
				/>
			</VideoContainer>
		);
	};
};