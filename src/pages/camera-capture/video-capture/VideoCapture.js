import React, {Component} from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {WIDTH, HEIGHT} from '../../../constants/';

const VideoContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 800px;
	min-width: 640px;
`;

const styles = {
	border: '1px solid black',
};

export default class VideoCapture extends Component {
	constructor(props) {
		super(props);

		this.webcam = React.createRef();
		this.videoContainer = React.createRef();

		this.state = {
			errCamera: false,
			videoContainer: {
				width: 800,
			},
		};

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

	componentDidMount() {
		const width = this.videoContainer.current.offsetWidth;
		this.setState({
			videoContainer: {
				width: width,
			},
		});
	};

	componentWillReceiveProps(newProps) {
		const {shooting} = newProps;

		if (shooting && shooting !== this.props.shooting) {
			this.capture();
		};
	};

	errCameraConnection = state => this.setState({errCamera: true});

	succesMedia = state => this.setState({errCamera: false});

	capture () {
		const {getPhotoUrl} = this.props;

		const photoUrl = this.webcam.current.getScreenshot();
		getPhotoUrl(photoUrl);
	};

	render() {
		const {errCamera, videoContainer} = this.state;

		return (
			<VideoContainer ref={this.videoContainer}>
				{errCamera && (
					<div><h3>Ошибка подключения камеры</h3></div>
				) || (
					<Webcam
						audio={false}
						width={videoContainer.width}
						height='600'
						screenshotFormat={'image/jpeg'}
						onUserMediaError={this.errCameraConnection}
						onUserMedia={this.succesMedia}
						ref={this.webcam}
						style={styles}
					/>
				)}
			</VideoContainer>
		);
	};
};