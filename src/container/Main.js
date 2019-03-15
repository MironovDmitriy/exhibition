import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {RegistrationForm} from '../pages';
import {CameraCapture} from '../pages';
import {ResultsReception} from '../pages';
import {NotFound404} from '../components/';

export default class Main extends Component {

	render() {

		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route exact path="/" component={RegistrationForm} />
						<Route exact path="/camera" component={CameraCapture} />
						<Route exact path="/results" component={ResultsReception} />
						<Route component={NotFound404} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	};
};