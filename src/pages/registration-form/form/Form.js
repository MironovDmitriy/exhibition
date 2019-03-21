import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Formik, Field} from 'formik'; 

import ModalDialog, {ModalTransition} from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import {TextFieldStatless} from '../../../components/';
import {PhotoUpload} from '../../../components/';
import {CheckboxField} from '../../../components/';
import {SelectField} from '../../../components/';

import validation from './validation';
import {options} from './options';

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	border: 1px solid #0c4687;
	border-radius: 5px;
	background: #acacac;
	background: -webkit-linear-gradient(bottom, #acacac, #D3D2D2);
	background: -moz-linear-gradient(bottom, #acacac, #D3D2D2);
	background: linear-gradient(to top, #acacac, #D3D2D2);
	-webkit-box-shadow: 2px 4px 13px 0px rgba(50, 50, 50, 0.65);
	-moz-box-shadow:    2px 4px 13px 0px rgba(50, 50, 50, 0.65);
	box-shadow:         2px 4px 13px 0px rgba(50, 50, 50, 0.65);
`;

const FooterContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;

const ButtonContainer = styled.div`
	margin: 0 5px;
`;

export default class RegForm extends Component {
	static propTypes = {
		getImgSrc: PropTypes.func.isRequired,
		resetImg: PropTypes.func.isRequired,
		request: PropTypes.func.isRequired,
	};

	constructor() {
		super();

		this.state = {
			initialValues:{
				surname: '',
				name: '',
				patronymic: '',
				companyName: '',
				position: '',
				fieldOfActivity: {value: '', label: ''},
				eMail: '',
				phoneNumber: '',
				photoUpload: '',
			},
			values: {
				surname: '',
				name: '',
				patronymic: '',
				companyName: '',
				position: '',
				fieldOfActivity: {value: '', label: ''},
				eMail: '',
				phoneNumber: '',
				photoUpload: '',
			},
			errors: {},
			dataProcessingAccept: false,
			isOpenModal: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.onHandleReset = this.onHandleReset.bind(this);
		this.handleValidation = this.handleValidation.bind(this);
		this.handleAcceptProcessing = this.handleAcceptProcessing.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	};

	getImgSrcBase64 = event => {
		const reader = new FileReader();

		reader.onloadend = () => {
			this.props.getImgSrc(reader.result);
		};

		const base64 = reader.readAsDataURL(event.target.files[0]);
	};

	handleChange = inputValue => {
		const {values} = this.state;

		const newState = {
			...values,
			[inputValue.field]: inputValue.value
		};

		this.setState({
			values: newState,
		});
	};

	handleSelect = inputValue => {
		const {values} = this.state;

		const newState = Object.assign({}, values, inputValue);

		this.setState({
			values: newState,
		});
	};

	onHandleReset(event) {
		event.preventDefault();
		const {initialValues} = this.state;

		this.setState({
			values: initialValues,
			dataProcessingAccept: false,
			errors: {},
		});
		this.props.resetImg();
	};

	onHandleSubmit(values) {
		console.log(values);
		// this.props.request(values)
		this.setState({isOpenModal: true});
	};

	handleValidation = () => {
		const {values} = this.state;

		const errObj = validation(values);

		this.setState({
			errors: errObj,
		});

		return errObj;
	};

	handleAcceptProcessing() {
		this.setState({
			dataProcessingAccept: !this.state.dataProcessingAccept,
		});
	};

	onCloseModal = () => this.setState({isOpenModal: false});

	render() {
		const {
			values,
			initialValues,
			errors,
			isOpenModal,
		} = this.state;

		const actions = [
			{text: 'OK', onClick: this.onCloseModal},
		];

		return (
			<FormContainer>
				<div><h3>Регистрация ПУЛЦЭВТГУУ</h3></div>
				<Formik
					validate={this.handleValidation}
					validateOnChange={false}
					validateOnBlur={false}
					initialValues={initialValues}
					onSubmit={() => this.onHandleSubmit(this.state.values)}
					render={(props) => (
						<form onSubmit={props.handleSubmit} onReset={props.resetForm}>

						<Field name="surname" render={({field}) => (
								<TextFieldStatless
									{...field}
									type="text"
									label="Фамилия"
									value={values[field.name]}
									handleChange={this.handleChange}
									validErr={errors[field.name]}
									autoFocus
								/>
							)}
						/>

						<Field name="name" render={({field}) => (
								<TextFieldStatless
									{...field}
									type="text"
									label="Имя"
									value={values[field.name]}
									handleChange={this.handleChange}
									validErr={errors[field.name]}
								/>
							)}
						/>

						<Field name="patronymic" render={({field}) => (
								<TextFieldStatless
									{...field}
									type="text"
									label="Отчество"
									value={values[field.name]}
									handleChange={this.handleChange}
									validErr={errors[field.name]}
								/>
							)}
						/>

						<Field name="companyName" render={({field}) => (
								<TextFieldStatless
									{...field}
									type="text"
									label="Компания"
									value={values[field.name]}
									handleChange={this.handleChange}
									validErr={errors[field.name]}
								/>
							)}
						/>

						<Field name="position" render={({field}) => (
								<TextFieldStatless
									{...field}
									type="text"
									label="Должность"
									value={values[field.name]}
									handleChange={this.handleChange}
									validErr={errors[field.name]}
								/>
							)}
						/>

						<Field name="fieldOfActivity" render={({field}) => (
								<SelectField
									{...field}
									options={options}
									label="Сфера деятельности"
									value={{
										value: values[field.name].value,
										label: values[field.name].label,
									}}
									handleChange={this.handleSelect}
									validErr={errors[field.name]}
								/>
							)}
						/>

						<Field name="eMail" render={({field}) => (
								<TextFieldStatless
									{...field}
									type="email"
									label="Электронный адрес"
									value={values[field.name]}
									handleChange={this.handleChange}
									validErr={errors[field.name]}
								/>
							)}
						/>

						<Field name="phoneNumber" render={({field}) => (
								<TextFieldStatless
									{...field}
									type="tel"
									label="Телефон"
									value={values[field.name]}
									handleChange={this.handleChange}
									validErr={errors[field.name]}
								/>
							)}
						/>

						<Field name="photoUpload" render={({field}) => (
								<PhotoUpload
									{...field}
									type="file"
									label="Загрузка фото"
									value={values[field.name]}
									handleChange={this.handleChange}
									getImgSrc={this.getImgSrcBase64}
									validErr={errors[field.name]}
								/>
							)}
						/>

						<Field name="dataProcessing" render={({field}) => (
								<CheckboxField
									{...field}
									isChecked={this.state.dataProcessingAccept}
									handleChange={this.handleAcceptProcessing}
								/>
							)}
						/>
							<FooterContainer>
								<ButtonContainer>
									<Button
										type="submit"
										appearance="primary"
										isDisabled={!this.state.dataProcessingAccept}
									>
										Отправить
									</Button>
								</ButtonContainer>
								<ButtonContainer>
									<Button
										type="reset"
										appearance="danger"
										onClick={this.onHandleReset}
									>
										Сбросить
									</Button>
								</ButtonContainer>
							</FooterContainer>

						</form>
					)}
				/>

				<ModalTransition>
					{isOpenModal
						&& <ModalDialog
								heading="Данные отправлены"
								actions={actions}
								onClose={this.onCloseModal}
					/>}
				</ModalTransition>
			</FormContainer>
		);
	};
};
