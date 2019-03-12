import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form, {Field, FormHeader, CheckboxField} from '@atlaskit/form';
import styled from 'styled-components';

import {Checkbox} from '@atlaskit/checkbox';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';

import options from '../../../constants/options';

const FormContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: 10px;
	border: 1px solid black;
	border-radius: 5px;
	background: #888888;
	background: -webkit-linear-gradient(bottom, #888888, #D3D2D2);
	background: -moz-linear-gradient(bottom, #888888, #D3D2D2);
	background: linear-gradient(to top, #888888, #D3D2D2);
	-webkit-box-shadow: 2px 4px 13px 0px rgba(50, 50, 50, 0.65);
	-moz-box-shadow:    2px 4px 13px 0px rgba(50, 50, 50, 0.65);
	box-shadow:         2px 4px 13px 0px rgba(50, 50, 50, 0.65);
`

export default class RegForm extends Component { 
	constructor(props) {
		super(props);

		this.state = {
			isChecked: false,
			fileBase64: '',
		};

		this.getImgBase64 = this.getImgBase64.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	};

	static propTypes = {
		getImgSrc: PropTypes.func.isRequired,
	};

	getImgBase64(event) {
		const {getImgSrc} = this.props;

		const reader = new FileReader();

		reader.onloadend = () => {
			this.setState({
				fileBase64: reader.result,
			});
			getImgSrc(reader.result);
		};
		const base64 = reader.readAsDataURL(event.target.files[0]);
	};

	onHandleSubmit(values) {
		const {fileBase64} = this.state;

		const obj = {
			surname: values.surname,
			name: values.name,
			patronymic: values.patronymic,
			companyName: values.companyName,
			position: values.position,
			fieldOfActivity: values.fieldOfActivity,
			eMail: values.eMail,
			phoneNumber: values.phoneNumber,
			photoFile: fileBase64,
		};

		console.log(obj);
	};

	handleChecked = state => this.setState({isChecked: !this.state.isChecked});

	reset = (formProps) => console.log(formProps)

	render() {
		const {isChecked} = this.state;
console.log(this.refs)
		return (
			<FormContainer>
				<Form onSubmit={this.onHandleSubmit} onClick={this.reset}>
					{({formProps}) => {
console.log(formProps)
						return (
						<form {...formProps}>

							<FormHeader title="Регистрация ПУЛЦЭВТГУУ" />

							<Field name="surname" defaultValue="" label="Фамилия" isRequired>
								{({fieldProps}) => <TextField autoFocus={true} {...fieldProps} />}
							</Field>

							<Field name="name" defaultValue="" label="Имя" isRequired>
								{({fieldProps}) => <TextField {...fieldProps} />}
							</Field>

							<Field name="patronymic" defaultValue="" label="Отчество" isRequired>
								{({fieldProps}) => <TextField {...fieldProps} />}
							</Field>

							<Field name="companyName" defaultValue="" label="Компания" isRequired>
								{({fieldProps}) => <TextField {...fieldProps} />}
							</Field>

							<Field name="position" defaultValue="" label="Должность" isRequired>
								{({fieldProps}) => <TextField {...fieldProps} />}
							</Field>

							<Field name="fieldOfActivity" defaultValue="" label="Сфера деятельности" isRequired>
								{({fieldProps}) => <Select options={options} {...fieldProps} />}
							</Field>

							<Field name="eMail" defaultValue="" label="Электронный адрес" isRequired>
								{({fieldProps}) => <TextField type="email" {...fieldProps} />}
							</Field>

							<Field name="phoneNumber" defaultValue="" label="Телефон" isRequired>
								{({fieldProps}) => <TextField type="tel" {...fieldProps} />}
							</Field>

							<Field name="photoUpload" defaultValue="" label="Загрузить фото" isRequired>
								{({fieldProps}) => <TextField type="file" onInput={this.getImgBase64} {...fieldProps} />}
							</Field>

							<CheckboxField name="dataProcessingAccept">
								{({fieldProps}) => (
									<Checkbox {...fieldProps}
										label="Даю согласие на обработку своих персональных данных"
										onClick={this.handleChecked}
										isChecked={isChecked}
									/>
								)}
							</CheckboxField>

							<Button 
								type="submit"
								appearance="primary"
								isDisabled={!isChecked}
							>
								Submit
							</Button>

							<Button 
								type="reset"
								onClick={this.reset}
								appearance="primary"
							>
								Reset
							</Button>

						</form>
					)}}
				</Form>
			</FormContainer>
		);
	};
};
