import React, {Component} from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import debounce from 'debounce';
import ModalDialog, {ModalTransition} from '@atlaskit/modal-dialog';

import {WIDTH, HEIGHT} from '../../constants/';
import VideoCapture from './video-capture';
import {ImageContainer} from '../../components/';
import {PageContainer as PageContainerMain} from '../../components';
import ResultsReception from '../results-reception/';

import {DELAY} from '../../constants';
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
			isImageOpen: false,
			photography: false,
			imgBase64: '',
			isOpenModal: false,
			results: {},
		};

		this.handleMakePhoto = this.handleMakePhoto.bind(this);
		this.getImgBase64 = this.getImgBase64.bind(this);
		this.getResults = this.getResults.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
	};

	handleMakePhoto () {
		this.setState({
			photography: true,
		});
	};

	getResults = result => {
		this.setState({
			results: result,
			isOpenModal: true,
		});
	};

	getImgBase64(src) {
		this.setState({
			imgBase64: src,
			isImageOpen: true,
			photography: false,
		});

	const value = Object.assign({}, {type: 'identify', data: {photo: src}});
	requestApi(window.websocket, value);
	getResponse(window.websocket, this.getResults);

	this.debounceChangeComponents();
	};

	changeComponents(state) {
		this.setState({
			isImageOpen: false,
		});
	};

	onCloseModal = () => this.setState({isOpenModal: false});

	debounceChangeComponents = debounce(this.changeComponents, DELAY);

	render () {
		const {
			isImageOpen,
			photography,
			imgBase64,
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
							onClick={this.handleMakePhoto}
						>
							Распознать
						</Button>
					</ButtonContainer>

					{isImageOpen ?
						<ImageContainer
							image={imgBase64}
							alt="Скриншот"
							width={WIDTH}
							height={HEIGHT}
							isSquare
						/>
					:
						<VideoCapture
							getSrcImg={this.getImgBase64}
							photography={photography}
						/>
					}
				</CameraConatiner>

				<ModalTransition>
					{isOpenModal
						&& <ResultsReception
							results={results}
							actions={actions}
							onClose={this.onCloseModal}
					/>}
				</ModalTransition>

			</PageContainerMain>
		);
	};
};
