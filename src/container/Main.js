import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {
	RegistrationForm,
	CameraCapture,
	History,
} from 'proj/pages';

const Main =() => {
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

export default Main;
