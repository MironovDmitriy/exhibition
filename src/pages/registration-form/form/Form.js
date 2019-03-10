import React, {Component} from 'react';
import Form, {Field, CheckboxField} from '@atlaskit/form';

import {Checkbox} from '@atlaskit/checkbox';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';

const onHandleSubmit = values => {

	const obj = {
		surname: values.surname,
		photoFile: window.btoa(values.photoUpload),
	};

	console.log(obj);
};

export default class RegForm extends Component { 
	constructor() {
		super();

		this.state = {
			isChecked: false,
		};
	};

	handleChecked = state => this.setState({isChecked: !this.state.isChecked});

	render() {
		const {isChecked} = this.state;

		return (
		  <Form onSubmit={onHandleSubmit}>
		    {({formProps}) => (
		      <form {...formProps}>

		        <Field name="surname" defaultValue="" label="Фамилия" isRequired>
		        	{({fieldProps}) => <TextField {...fieldProps} />}
		        </Field>

		       <Field name="eMail" defaultValue="" label="Электронный адрес" isRequired>
		       	{({fieldProps}) => <TextField type="email" {...fieldProps} />}
		       </Field>

		       <Field name="phoneNumber" defaultValue="" label="Телефон" isRequired>
		       	{({fieldProps}) => <TextField type="tel" {...fieldProps} />}
		       </Field>

		       <Field name="photoUpload" defaultValue="" label="Загрузить фото" isRequired>
		       	{({fieldProps}) => <TextField type="file" {...fieldProps} />}
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
		);
	};
};
