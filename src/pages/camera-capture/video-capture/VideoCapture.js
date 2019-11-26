import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import clm from 'clmtrackr';
import {emotionClassifier} from 'proj/emotion_classifier/emotion_classifier.js';
import {emotionModel} from 'proj/emotion_classifier/emotionmodel.js';
import sad from 'proj/image/sad.png';
import angry from 'proj/image/angry.png';
import happy from 'proj/image/happy.png';
import surprised from 'proj/image/surprised.png';

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
	height: 80px;
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

const SmileContainer = styled.div`
	display: flex;
	align-items: center;
	width: 25%;
`;

const Box = styled.div`
	width: 25%;
`;

const SMILE_HEIGHT = '70px';

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
			emotionDetecter: null,
			isFaceDetect: false,
			errCamera: false,
			intervalId: null,
			intervalIdEmotions: null,
			emotionSmile: null,
		};

		this.capture = this.capture.bind(this);
		this.autoCapture = this.autoCapture.bind(this);
		this.drawLoop = this.drawLoop.bind(this);
		this.drawEmotions = this.drawEmotions.bind(this);
		this.getEmotions = this.getEmotions.bind(this);
	};

	static propTypes = {
		getPhotoUrl: PropTypes.func.isRequired,
		shooting: PropTypes.bool.isRequired,
		fetching: PropTypes.bool.isRequired,
	};

	componentDidMount() {
		const intervalId = setInterval(() => this.autoCapture(), 3000);
		const intervalIdEmotions = setInterval(() => this.getEmotions(), 100);
		delete emotionModel['disgusted'];
		delete emotionModel['fear'];
		this.setState({
			videoElement: this.webcam.current.video,
			canvasElement: this.canvas.current,
			intervalId: intervalId,
			intervalIdEmotions: intervalIdEmotions,
		});
	};

	componentDidUpdate(prevProps, prevState) {
		const {shooting, fetching} = prevProps;
		const {videoElement, ctrack, emotionDetecter} = this.state;

		if (this.props.fetching && fetching !== this.props.fetching) {
			clearInterval(this.state.intervalId);
			clearInterval(this.state.intervalIdEmotions);
		};

		if (this.props.shooting && this.props.shooting !== shooting
			&& !this.state.errCamera) {
			this.capture();
		};

		if (videoElement
			&& prevState.videoElement !== videoElement) {
			this.setState({
				emotionDetecter: new emotionClassifier(),
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

		if (emotionDetecter
			&& prevState.emotionDetecter !== emotionDetecter) {
			emotionDetecter.init(emotionModel);
			this.drawEmotions();
		};
	};

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
		clearInterval(this.state.intervalIdEmotions);
	};

	errCameraConnection = state => this.setState({errCamera: true});

	successCameraConnection = state => this.setState({errCamera: false});

	autoCapture() {
		const {getPhotoUrl, fetching} = this.props;
		const {ctrack} = this.state;
		const isFaceDetect = ctrack.getCurrentPosition();
		console.log('autoCapture');
		if (isFaceDetect) {
			const photoUrl = this.webcam.current.getScreenshot();
			getPhotoUrl(photoUrl);
			clearInterval(this.state.intervalId);
			clearInterval(this.state.intervalIdEmotions);
		} else {
			console.log('No face detected');
		};
	};

	capture() {
		const {getPhotoUrl} = this.props;

		const photoUrl = this.webcam.current.getScreenshot();
		getPhotoUrl(photoUrl);
	};

	drawLoop() {
		const {ctrack, canvasElement, isFaceDetect} = this.state;
		const canvasContext = canvasElement.getContext('2d');
		const currentPosition = ctrack.getCurrentPosition();

		requestAnimationFrame(this.drawLoop);
		canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

		if (currentPosition) {
			ctrack.draw(canvasElement);
		};
	};

	drawEmotions() {
		const {ctrack, emotionDetecter} = this.state;
		const parameters = ctrack.getCurrentParameters();

		return emotionDetecter.meanPredict(parameters);
	};

	getEmotions() {
		const emotions = this.drawEmotions();
		let max = 0;
		let emotion = '';
		let result = null;

		emotions && emotions.length > 0 && emotions.forEach(x => {
			if (x.value > max) {
				max = x.value;
				emotion = x.emotion;
			};
		});

		switch(emotion) {
			case 'sad':
				result = sad;
				break;
			case 'angry':
				result = angry;
				break;
			case 'happy':
				result = happy;
				break;
			case 'surprised':
				result = surprised;
				break;
			default:
				result = happy;
				break;
		}

		this.setState({emotionSmile: result});
	};

	render() {
		const {errCamera, ctrack, emotionSmile} = this.state;
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
						<SmileContainer>
							<img src={emotionSmile} alt='Смайлик' height={SMILE_HEIGHT} />
						</SmileContainer>
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