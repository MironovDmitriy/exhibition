import React, {Component} from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const VideoContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const styles = {
	zIndex: '0',
};

const getCameraHeight = () => {
	let scrollHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);

	return scrollHeight;
};

export default class VideoCapture extends Component {
	constructor(props) {
		super(props);

		this.webcam = React.createRef();
		this.videoContainer = React.createRef();

		this.state = {
			errCamera: false,
		};

		this.capture = this.capture.bind(this);
	};

	static propTypes = {
		getPhotoUrl: PropTypes.func.isRequired,
		shooting: PropTypes.bool.isRequired,
	};

	static defaultProps = {
		shooting: false,
	};

	componentDidUpdate(prevProps) {
		const {shooting} = prevProps;

		if (this.props.shooting && this.props.shooting !== shooting) {
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
		const cameraHeight = getCameraHeight();

		return (
			<VideoContainer ref={this.videoContainer}>
				{errCamera ? (
					<div><h3>Ошибка подключения камеры</h3></div>
				) : (
					<Webcam
						audio={false}
						width='auto'
						height={cameraHeight}
						screenshotFormat='image/jpeg'
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