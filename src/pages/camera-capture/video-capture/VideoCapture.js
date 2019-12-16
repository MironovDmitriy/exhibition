import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import clm from 'clmtrackr';

const VideoContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: relative;
`;

const Canvas = styled.canvas`
	position: absolute;
	top: 0;
	left: 0;
	width: ${props => props.width};
	height: ${props => props.height};
`;

const StatusContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	height: 50px;
	position: absolute;
	top: 0;
	width: 100%;
	background: linear-gradient(to right, #87A1DD 25%, #36385F 75%);
`;

const TextContainer = styled.div`
	display: flex;
	align-items: center;
	width: 25%;
`;

const Box = styled.div`
	width: 25%;
`;

const getCameraHeight = () => {
	const height = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);

	return height;
};

export default class VideoCapture extends PureComponent {
	constructor(props) {
		super(props);

		this.webcam = React.createRef();
		this.canvas = React.createRef();

		this.state = {
			videoElement: null,
			canvasElement: null,
			ctrack: null,
			isFaceDetect: false,
			errCamera: false,
			intervalId: null,
		};

		this.capture = this.capture.bind(this);
		this.autoCapture = this.autoCapture.bind(this);
		this.drawLoop = this.drawLoop.bind(this);
	};

	static propTypes = {
		getPhotoUrl: PropTypes.func.isRequired,
		shooting: PropTypes.bool.isRequired,
		fetching: PropTypes.bool.isRequired,
	};

	componentDidMount() {
		const intervalId = setInterval(() => this.autoCapture(), 3000);
		this.setState({
			videoElement: this.webcam.current.video,
			canvasElement: this.canvas.current,
			intervalId: intervalId,
		});
	};

	componentDidUpdate(prevProps, prevState) {
		const {shooting, fetching} = prevProps;
		const {videoElement, ctrack} = this.state;

		if (this.props.fetching && fetching !== this.props.fetching) {
			clearInterval(this.state.intervalId);
		};

		if (this.props.shooting && this.props.shooting !== shooting
			&& !this.state.errCamera) {
			this.capture();
		};

		if (videoElement
			&& prevState.videoElement !== videoElement) {
			this.setState({
				ctrack: new clm.tracker({
					faceDetection: {useWebWorkers: false}
				})
			});
		};

		if (ctrack
			&& prevState.ctrack !== ctrack) {
			ctrack.init();
			ctrack.start(videoElement);
			this.drawLoop();
		};
	};

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	};

	errCameraConnection = state => this.setState({errCamera: true});

	successCameraConnection = state => this.setState({errCamera: false});

	autoCapture() {
		const {getPhotoUrl} = this.props;
		const {ctrack} = this.state;
		const isFaceDetect = ctrack.getCurrentPosition();

		if (isFaceDetect) {
			const photoUrl = this.webcam.current.getScreenshot();
			getPhotoUrl(photoUrl);
			clearInterval(this.state.intervalId);
		}
	};

	capture() {
		const {getPhotoUrl} = this.props;

		const photoUrl = this.webcam.current.getScreenshot();
		getPhotoUrl(photoUrl);
	};

	drawLoop() {
		const {ctrack, canvasElement} = this.state;
		const canvasContext = canvasElement.getContext('2d');
		const currentPosition = ctrack.getCurrentPosition();

		requestAnimationFrame(this.drawLoop);
		canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

		if (currentPosition) {
			ctrack.draw(canvasElement);
		};
	};

	render() {
		const {errCamera} = this.state;
		const {fetching} = this.props;
		const cameraHeight = getCameraHeight();

		return (
			errCamera ? (
				<div><h3>Ошибка подключения камеры</h3></div>
			) : (
				<VideoContainer>
					<StatusContainer>
						<Box />
						<TextContainer>
							{fetching ? 'Получение результатов' : 'Посмотрите, пожалуйста, в камеру'}
						</TextContainer>
						<Box />
					</StatusContainer>
					<Webcam
						audio={false}
						width='1500'
						height={cameraHeight}
						screenshotFormat='image/jpeg'
						onUserMediaError={this.errCameraConnection}
						onUserMedia={this.successCameraConnection}
						ref={this.webcam}
					/>
					<Canvas
						width='1500'
						height={cameraHeight}
						ref={this.canvas}
					/>
				</VideoContainer>
			)
		);
	};
};