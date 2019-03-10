import React, {Component} from 'react';

import {PageContainer} from '../components';
import RegistrationForm from '../pages/registration-form';
// import CameraCapture from '../pages/camera-capture';

export default class Main extends Component {

	render() {
		return (
			<PageContainer>
				<RegistrationForm />
				{/*<CameraCapture />*/}
			</PageContainer>
		);
	}
}