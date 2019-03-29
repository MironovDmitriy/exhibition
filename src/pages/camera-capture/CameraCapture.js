import React, {Component} from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import ModalDialog, {ModalTransition} from '@atlaskit/modal-dialog';
import VideoCapture from './video-capture';
import {PageContainer as PageContainerMain} from '../../components';
import {ResultsReception} from '../../components';
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
	width: 100%;
	max-width: 800px;
	padding: 3px;
`;

export default class CameraCapture extends Component {
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

	sendToServer(photoUrl) {
		const value = Object.assign({}, {type: 'identify', data: {photo: photoUrl}});
		requestApi(window.websocket, value);
		getResponse(window.websocket, this.getResults);
	};

	onCloseModal() {
		this.setState({
			isOpenModal: false,
			results: null,
			photoBase64: '',
		});
	};

	refreshPage = () => window.location.reload();

	render () {
		const {
			shooting,
			isOpenModal,
			results,
		} = this.state;

		const actions = [
			{text: 'Ok', onClick: this.onCloseModal},
		];

		return (
			<PageContainerMain>

				<CameraConatiner>

					<ButtonContainer>
						<Button
							appearance={'primary'}
							shouldFitContainer={true}
							onClick={this.handleShooting}
						>
							Распознать
						</Button>
					</ButtonContainer>

					<VideoCapture
						getPhotoUrl={this.getPhotoUrl}
						shooting={shooting}
					/>

					<ButtonContainer>
						<Button
							appearance={'primary'}
							shouldFitContainer={true}
							onClick={this.refreshPage}
						>
							Новый пользователь
						</Button>
					</ButtonContainer>

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
