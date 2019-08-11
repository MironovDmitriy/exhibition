import React, {PureComponent} from 'react';
import styled from 'styled-components';
import VideoCapture from './video-capture';
import {PageContainer as PageContainerMain} from '../../components';
import {PhotoContainer} from '../../components/';
import {requestApi} from '../../api/requestApi';
import {getResponse} from '../../api/requestApi';

const CameraConatiner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 44%;
`;

export default class CameraCapture extends PureComponent {
	constructor () {
		super();

		this.state = {
			shooting: false,
			photoBase64: '',
			isOpenModal: false,
			results: null,
		};

		this.handleShooting = this.handleShooting.bind(this);
		this.getPhotoUrl = this.getPhotoUrl.bind(this);
		this.getResults = this.getResults.bind(this);
	};

	componentDidUpdate(prevState) {
		const {photoBase64, results} = this.state;

		if (!results && photoBase64 && photoBase64 !== prevState.photoBase64) {
			this.sendToServer(photoBase64);
		};
	};

	handleShooting() {
		this.setState({shooting: true});
	};

	getResults(result) {
		this.setState({
			results: result,
		});
	};

	getPhotoUrl(src) {
		this.setState({
			photoBase64: src,
			shooting: false,
			isPhotoShown: true,
		});
	};

	sendToServer(photoUrl) {
		// const value = Object.assign({}, {type: 'identify', data: {photo: photoUrl}});
		// requestApi(window.websocket, value);
		// getResponse(window.websocket, this.getResults);
		console.log('photo');
	};

	refreshPage = () => window.location.reload();

	render () {
		const {
			shooting,
			results,
		} = this.state;

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
				/>
			</PageContainerMain>
		);
	};
};
