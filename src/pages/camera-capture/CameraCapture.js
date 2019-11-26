import React, {PureComponent} from 'react';
import styled from 'styled-components';
import VideoCapture from './video-capture';
import {PageContainer as PageContainerMain} from 'proj/components';
import PhotoContainer from './photo-container';
import {photoRecognition} from 'proj/api/video-capture';
import {userRecognition} from 'proj/api/video-capture';
import {toCrm} from 'proj/api/video-capture';

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
			user: null,
			photoRecognitionResults: null,
			fetching: false,
		};

		this.handleShooting = this.handleShooting.bind(this);
		this.getPhotoUrl = this.getPhotoUrl.bind(this);
		this.getUserName = this.getUserName.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
	};

	async componentDidUpdate(prevProps, prevState) {
		const {photoBase64, user, photoRecognitionResults} = this.state;

		if (photoBase64
			&& photoBase64 !== prevState.photoBase64) {
			console.log('photoBase64');
			const value = {
				type: 'identify',
				data: {
					photo: photoBase64,
				},
			};
			this.setState({fetching: true});
			userRecognition(value, this.getUserName);
			const result = await photoRecognition(photoBase64);
			this.setState({photoRecognitionResults: result, fetching: false});
		};

		if (user && photoRecognitionResults) {
			setTimeout(() => this.refreshPage(), 4000);
		};

		if (user && prevState.user !== user) {
			toCrm(user.data)
		};
	};

	handleShooting = () => this.setState({shooting: !this.state.shooting});

	getUserName = result => this.setState({user: result});

	getPhotoUrl = src => this.setState({photoBase64: src, shooting: false});

	refreshPage = () => window.location.reload();

	render () {
		const {shooting, photoBase64, user, photoRecognitionResults, fetching} = this.state;

		return (
			<PageContainerMain>
				<CameraConatiner>
					<VideoCapture
						getPhotoUrl={this.getPhotoUrl}
						shooting={shooting}
						fetching={fetching}
					/>
				</CameraConatiner>
				<PhotoContainer
					handleShooting={this.handleShooting}
					photo={photoBase64}
					shooting={shooting}
					result={concatResults(user, photoRecognitionResults)}
					fetching={fetching}
				/>
			</PageContainerMain>
		);
	};
};
