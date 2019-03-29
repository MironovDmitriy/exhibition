import React, {Component} from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import ReactToPrint from "react-to-print";
import PropTypes from 'prop-types';

const ProfileContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	border-radius: 5px;
	border: 1px solid #0c4687;
	margin: 10px;
	box-shadow: 2px 4px 13px 0px rgba(50, 50, 50, 0.65);
`;

const InfoContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 0 25px;

	@media print {
		display: flex;
		align-items: center;
		font-size: 120%;
	}
`;

const PrintArea = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media print {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: flex-end;
	margin: 0 50px 10px 0;
`;

export default class ResultProfile extends Component {
	static defaultProps = {
		results: null,
	};

	static propsType = {
		results: PropTypes.object,
	}

	render() {
		const {results} = this.props;

		return (
			<ProfileContainer>

				<PrintArea ref={el => (this.componentRef = el)}>

					<InfoContainer>
						<div>
							<h3>{`${results.data.surname} ${results.data.name}`}</h3>
						</div>
					</InfoContainer>

				</PrintArea>

				<ButtonContainer>
					<ReactToPrint
						trigger={() => {
							return (
								<Button appearance="primary">
									Печать
								</Button>
							)}}
						content={() => this.componentRef}
					/>
				</ButtonContainer>

			</ProfileContainer>
		);
	};
};
