import React, {Component} from 'react';
import styled from 'styled-components';
import debounce from 'debounce';
import {WIDTH, HEIGHT, DELAY} from '../../constants/';

import Button from '@atlaskit/button';
import ModalDialog, {ModalTransition} from '@atlaskit/modal-dialog';
import VideoCapture from './video-capture';
import {ImageContainer} from '../../components/';
import {PageContainer as PageContainerMain} from '../../components';
import ResultsReception from '../results-reception/';

import {requestApi} from '../../api/requestApi';
import {getResponse} from '../../api/requestApi';

const CameraConatiner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 70%;
	margin: 0 40px 0 0;
	border-radius: 5px;
	border: 2px solid #0c4687;
	background-color: rgba(255, 255, 255, 0.2); 
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 3px;
	width: ${props => props.width}px;
`;

export default class CameraCapture extends Component {
	constructor () {
		super();

		this.state = {
			isPhotoShown: false,
			shooting: false,
			photoBase64: '',
			isOpenModal: false,
			results: null,
		};

		this.handleShooting = this.handleShooting.bind(this);
		this.getPhotoUrl = this.getPhotoUrl.bind(this);
		this.getResults = this.getResults.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
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
			isOpenModal: true,
		});
	};

	getPhotoUrl(src) {
		this.setState({
			photoBase64: src,
			shooting: false,
			isPhotoShown: true,
		});
	};

	hidePhotoImage(state) {
		this.setState({isPhotoShown: false});
	};

	hidePhoto = debounce(this.hidePhotoImage, DELAY);

	sendToServer(photoUrl) {
		const value = Object.assign({}, {type: 'identify', data: {photo: photoUrl}});
		console.log(value);
		requestApi(window.websocket, value);
		getResponse(window.websocket, this.getResults);
		// getResponse(this.getResults);
	};

	onCloseModal = () => {
		this.setState({
			isOpenModal: false,
			isPhotoShown: false,
			results: null,
			photoBase64: '',
		});
	};

	render () {
		const {
			isPhotoShown,
			shooting,
			photoBase64,
			isOpenModal,
			results,
		} = this.state;

		const actions = [
			{text: 'Ok', onClick: this.onCloseModal},
		];

		return (
			<PageContainerMain>
				<CameraConatiner>
					<ButtonContainer width={WIDTH}>
						<Button
							appearance={'primary'}
							shouldFitContainer={true}
							onClick={this.handleShooting}
						>
							Распознать
						</Button>
					</ButtonContainer>

					{isPhotoShown ?
						<ImageContainer
							image={photoBase64}
							alt="Скриншот"
							width={WIDTH}
							height={HEIGHT}
							isSquare
						/>
					:
						<VideoCapture
							getPhotoUrl={this.getPhotoUrl}
							shooting={shooting}
						/>
					}
				</CameraConatiner>

				<ModalTransition>
					{isOpenModal && (
						<ModalDialog
							actions={actions}
							onClose={this.onCloseModal}
							components={{
								Body: () => (
									<ResultsReception results={results} />
								),
							}}
						/>
					)}
				</ModalTransition>

			</PageContainerMain>
		);
	};
};
