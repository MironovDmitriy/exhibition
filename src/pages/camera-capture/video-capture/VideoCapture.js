import React, {Component} from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const WIDTH = '800';
const HEIGHT = '600';

export default class VideoCapture extends Component {
	constructor(props) {
		super(props);

		this.webcam = React.createRef();
		this.videoContainer = React.createRef();

		this.state = {
			errCamera: false,
			videoContainer: {
				width: WIDTH,
			},
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

	componentDidMount() {
		const width = this.videoContainer.current.offsetWidth;
		this.setState({
			videoContainer: {
				width: width,
			},
		});
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

		return (
			<VideoContainer ref={this.videoContainer}>
				{errCamera ? (
					<div><h3>Ошибка подключения камеры</h3></div>
				) : (
					<Webcam
						audio={false}
						width={videoContainer.width}
						height={HEIGHT}
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