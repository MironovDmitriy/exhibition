import React, {Component} from 'react';
import Form, {Field, FormHeader, CheckboxField} from '@atlaskit/form';
import styled from 'styled-components';

import {Checkbox} from '@atlaskit/checkbox';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import {ImageContainer} from '../../../components/';

import options from '../../../constants/options';

const PageContainer = styled.div`
	width: 100vh;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border: 1px solid red;
`

const PhotoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
	height: 300px;
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

	getImgBase64(event) {
		const reader = new FileReader();

		reader.onloadend = () => {
			this.setState({
				fileBase64: reader.result,
			});
		}
		const base64 = reader.readAsDataURL(event.target.files[0]);
		return base64;
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


	render() {
		const {isChecked, fileBase64} = this.state;

		return (
			<PageContainer>
				<Form onSubmit={this.onHandleSubmit}>
					{({formProps}) => (
						<form {...formProps}>

							<FormHeader title="Регистрация ПУЛЦЭВТГУУ" />

							<Field name="surname" defaultValue="" label="Фамилия" isRequired>
								{({fieldProps}) => <TextField {...fieldProps} />}
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

						</form>
					)}
				</Form>

				<PhotoContainer>
					<div>Место для фото</div>
					{fileBase64 && <ImageContainer
						image={fileBase64}
						alt="Загрузка фото"
						width="250"
						height="250"
					/>}
				</PhotoContainer>
			</PageContainer>
		);
	};
};
