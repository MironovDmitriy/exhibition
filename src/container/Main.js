import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import RegistrationForm from '../pages/registration-form';
import CameraCapture from '../pages/camera-capture';
import {NotFound404} from '../components/';

export default class Main extends Component {

	render() {

		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route exact path="/" component={RegistrationForm} />
						<Route exact path="/camera" component={CameraCapture} />
						<Route component={NotFound404} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	};
};