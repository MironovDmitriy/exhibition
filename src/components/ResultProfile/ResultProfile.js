import React, {Component} from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import ReactToPrint from "react-to-print";

// const ProfileContainer = styled.div`
// 	display: flex;
// 	flex-direction: row;
// 	justify-content: space-between;
// 	border-radius: 5px;
// 	border: 1px solid #0c4687;
// 	background: #888888;
// 	background: -webkit-linear-gradient(bottom, #888888, #D3D2D2);
// 	background: -moz-linear-gradient(bottom, #888888, #D3D2D2);
// 	background: linear-gradient(to top, #888888, #D3D2D2);
// 	-webkit-box-shadow: 2px 4px 13px 0px rgba(50, 50, 50, 0.65);
// 	-moz-box-shadow:    2px 4px 13px 0px rgba(50, 50, 50, 0.65);
// 	box-shadow:         2px 4px 13px 0px rgba(50, 50, 50, 0.65);
// `;

const ProfileContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	border-radius: 5px;
	border: 1px solid #0c4687;
	background: linear-gradient(90deg, rgba(203,203,203, 0) 0%, rgba(203,203,203, 0.2) 25%, rgba(203,203,203, 0.2) 75%, rgba(255, 255, 255, 0) 100%);
	-webkit-box-shadow: 2px 4px 13px 0px rgba(50, 50, 50, 0.65);
	-moz-box-shadow:    2px 4px 13px 0px rgba(50, 50, 50, 0.65);
	box-shadow:         2px 4px 13px 0px rgba(50, 50, 50, 0.65);
`;

const PhotoContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 0 25px;

	@media print {
		display: flex;
		align-items: center;
		margin: 3em 0;
		width: 70%;
		height: 50%;

		.image {
			margin: auto;
			dispaly: block;
			height: auto;
			max-height: 100%;
			max-width: 100%;
			width: auto;
			border: 1px solid black;
		}
	}
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
	justify-content: space-between;

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

	render() {
		const {data} = this.props;

		return (
			<ProfileContainer>

				<PrintArea ref={el => (this.componentRef = el)}>

					<PhotoContainer>
						<img className='image'
							src={data.photoUpload}
							style={{border: '1px solid #0c4687'}}
							width='200px'
							height='200px'
							alt={`${data.surname} ${data.name}`}
						/>
					</PhotoContainer>

					<InfoContainer>
						<div>
							<h3>{`${data.surname} ${data.name} ${data.patronymic}`}</h3>
							<p><b>Компания:</b> {data.companyName}</p>
							<p><b>Должность:</b> {data.position}</p>
							<p><b>Сфера деятельности:</b> {data.fieldOfActivity}</p>
							<p><b>Телефон:</b> {data.phoneNumber}</p>
							<p><b>Электронный адрес:</b> {data.eMail}</p>
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
