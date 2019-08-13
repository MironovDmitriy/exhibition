import React, {PureComponent} from 'react';
import styled from 'styled-components';
import Form from './form';
import {PageContainer as PageContainerMain} from 'proj/components';
import {CheckboxField} from 'proj/components';
import {ButtonBase} from 'proj/components';
import {requestApi} from 'proj/api/requestApi';
import {getResponse} from 'proj/api/requestApi';
import photoIcon from 'proj/image/photo-icon.png';

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: #F0F1F7;
`;

const BaseContainer = styled.div`
	display: flex;
	width: 70vw;
	margin: 0 0 0 10vw;
	font-family: "Russo One";
`;

const TopContainer = styled(BaseContainer)`
	height: 7vh;
	font-size: 1.3em;
`;

const BottomContainer = styled(BaseContainer)`
	height: 10vh;
	font-size: 0.8em;
	color: #7A81A0;
`;

const Container = styled(BaseContainer)`
	flex-direction: column;
	align-items: center;
	width: 30vw;
	margin: 0 2vw 0 0;
`;

const LeftContainer = styled(Container)`
	border: 3px dashed #E0E2F1;
	border-radius: 25px;
`;

const PhotoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px 0 10px 0;
	height: 50vh;
	width: 100%;
`;

const TextContainer = styled(Container)`
	margin: 0;
	height: 5vh;
	color: #7A81A0;
`

const Input = styled.input`
	display: none;
`;

const Button = styled(ButtonBase)`
	color: #7A81A0;
	border: 2px solid #7A81A0;

	:hover {
		color: #EEE;
		background-color: #7A81A0;
		border-color: #7A81A0;
	}
`;

const SubmitButton = styled(ButtonBase)`
	margin: 2vh 0 0 0;
	width: 25vw;
	color: #FFF;
	background: linear-gradient(to right, #FF9F89, #DE6167);

	:hover {
		background: linear-gradient(to right, #FF9F70, #DE6150);
	}
`;

const appearances = [{
	title: 'errChecked',
	value: 'Необходимо согласие на обработку персональных данных',
}, {
	title: 'errNoPhoto',
	value: 'Необходимо загрузить фото профиля',
}, {
	title: 'errNoSurname',
	value: 'Не указана фамилия',
}];

export default class RegistrationForm extends PureComponent {
	constructor(props) {
		super(props);

		this.node = React.createRef();

		this.state = {
			formValues: {},
			isChecked: false,
			fileBase64: '',
			validErr: {},
			results: null,
		};

		this.submitForm = this.submitForm.bind(this);
	};

	handleChooseFile = () => this.node.current.click();

	handleChangeFile = event => {
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = () => {
			const dataURL = reader.result;
			this.setState({fileBase64: dataURL});
		};
	};

	handleChangeForm = value => this.setState({formValues: value});

	onHandleCheck = () => this.setState({isChecked: !this.state.isChecked});

	getResults = result => this.setState({results: result});

	submitForm() {
		const {formValues, isChecked, fileBase64} = this.state;

		if (!isChecked) {
			this.setState({validErr: appearances.find(x => x.title === 'errChecked')});
		} else if (!fileBase64) {
			this.setState({validErr: appearances.find(x => x.title === 'errNoPhoto')});
		} else if (formValues && !formValues.surname) {
			this.setState({validErr: appearances.find(x => x.title === 'errNoSurname')});
		} else {
			const data = {
				type: 'registrate',
				data: {
					...formValues,
					['photo']: fileBase64,
				},
			};

			requestApi(window.websocket, data);
			getResponse(window.websocket, this.getResults);
			this.setState({
				formValues: {},
				isChecked: false,
				fileBase64: '',
				validErr: {},
			});
		};
	};

	render() {
		const {isChecked, fileBase64, validErr, results} = this.state;

		return (
			<PageContainerMain>
				<PageContainer>
					<TopContainer>
						Регистрация ПУЛЦЭВТ ГУУ
					</TopContainer>
					<BaseContainer>
						<LeftContainer>
							<PhotoContainer>
								{!fileBase64 ? (
									<img
										src={photoIcon}
										alt='Иконка фотоаппарата'
										height='20%'
										width='auto'
									/>
								) : (
									<img
										src={fileBase64}
										alt='Фото профиля'
										style={{
											display: 'block',
											margin: 'auto',
											maxHeight: '99%',
											maxWidth: '99%'
										}}
									/>
								)}
							</PhotoContainer>
							<TextContainer>
								Фото профиля
							</TextContainer>
							<TextContainer>
								<Button
									onClick={this.handleChooseFile}
								>
									ВЫБИРИТЕ ФОТО
								</Button>
								<Input
									type='file'
									ref={this.node}
									onChange={this.handleChangeFile}
								/>
							</TextContainer>
						</LeftContainer>
						<Container>
							<Form
								onChange={this.handleChangeForm}
							/>
						</Container>
					</BaseContainer>
					<BottomContainer>
						<Container>
							<CheckboxField
								checked={isChecked}
								handleChange={this.onHandleCheck}
							/>
						</Container>
						<Container>
							<SubmitButton
								onClick={this.submitForm}
							>
								ЗАРЕГИСТРИРОВАТЬСЯ
							</SubmitButton>
							<TextContainer>
								{validErr && validErr.value}
								{results && results.status && results.status === 'succes' // TODO
								&& (
									<div>Данные отправлены успешно</div>
								)}
								{results && results.status && results.status === 'error'
								&& (
									<div>Ошибка при отправке данных</div>
								)}
							</TextContainer>
						</Container>
					</BottomContainer>
				</PageContainer>
			</PageContainerMain>
		);
	};
};



