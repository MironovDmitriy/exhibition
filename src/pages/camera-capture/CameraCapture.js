import React, {PureComponent} from 'react';
import styled from 'styled-components';
import VideoCapture from './video-capture';
import {PageContainer as PageContainerMain} from 'proj/components';
import PhotoContainer from './photo-container';
import {photoRecognition} from 'proj/api/video-capture';
import {userRecognition} from 'proj/api/video-capture';

const CameraConatiner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 44%;
`;

const concatResults = (x, y) => x && y ? {...x, ...y} : null;

export default class CameraCapture extends PureComponent {
	constructor () {
		super();

		this.state = {
			shooting: false,
			photoBase64: '',
			results: null,
			photoRecognitionResults: null,
		};

		this.handleShooting = this.handleShooting.bind(this);
		this.getPhotoUrl = this.getPhotoUrl.bind(this);
		this.getResults = this.getResults.bind(this);
	};

	async componentDidUpdate(prevState) {
		const {photoBase64, results, photoRecognitionResults} = this.state;

		if (!photoRecognitionResults && !results && photoBase64
			&& photoBase64 !== prevState.photoBase64) {
			const value = {
				type: 'identify',
				data: {
					photo: photoBase64,
				},
			};
			const recognitionResults = await photoRecognition(photoBase64);
			userRecognition(value, this.getResults);
			this.setState({photoRecognitionResults: recognitionResults});
		};
	};

	handleShooting = () => this.setState({shooting: !this.state.shooting});

	getResults = result => this.setState({results: result});

	getPhotoUrl = src => this.setState({photoBase64: src, shooting: false});

	refreshPage = () => window.location.reload();

	render () {
		const {shooting, photoBase64, results, photoRecognitionResults} = this.state;

		return (
			<PageContainerMain>
				<CameraConatiner>
					<VideoCapture
						getPhotoUrl={this.getPhotoUrl}
						shooting={shooting}
					/>
				</CameraConatiner>
				<PhotoContainer
					handleShooting={this.handleShooting}
					imgSrc={photoBase64}
					shooting={shooting}
					result={concatResults(results, photoRecognitionResults)}
				/>
			</PageContainerMain>
		);
	};
};
