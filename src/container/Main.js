import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {RegistrationForm} from '../pages';
import {CameraCapture} from '../pages';
import {History} from '../pages';
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
						<Route exact path="/history" component={History} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	};
};