import React, {Component} from 'react';
import styled from 'styled-components';
import RegistrationForm from '../pages/registration-form/RegistrationForm';

const MainContainer = styled.div`

`

export default class Main extends Component {
	constructor () {
		super()
	}

	render() {
		return (
			<MainContainer>
				<RegistrationForm />
			</MainContainer>
		);
	}
}