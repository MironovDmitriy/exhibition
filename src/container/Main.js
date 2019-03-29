import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {RegistrationForm} from '../pages';
import {CameraCapture} from '../pages';
import {NotFound404} from '../components/';
import wsUrl from '../config/paths';

export default class Main extends Component {

	render() {
		const ws = new WebSocket(wsUrl);
		window.websocket = ws;

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