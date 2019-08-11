import React, {Component} from 'react';
import styled from 'styled-components';
import Form from './form';
import {ImageContainer} from '../../components';
import {PageContainer as PageContainerMain} from '../../components';

const PageContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 70%;
	margin: 0 40px 0 0;
	border-radius: 5px;
	border: 2px solid #0c4687;
	background-color: rgba(255, 255, 255, 0.2); 
`;

const WIDTH = 200;
const HEIGHT = 200;

export default class RegistrationForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fileBase64: '',
		};

		this.getImgSrc = this.getImgSrc.bind(this);
		this.resetImg = this.resetImg.bind(this);
	};

	getImgSrc(src) {
		this.setState({fileBase64: src});
	};

	resetImg() {
		this.setState({fileBase64: ''});
	};

	render() {
		const {fileBase64} = this.state;

		return (
			<PageContainerMain>
				<PageContainer>
					<Form
						getImgSrc={this.getImgSrc}
						resetImg={this.resetImg}
					/>
				</PageContainer>
			</PageContainerMain>
		);
	};
};



