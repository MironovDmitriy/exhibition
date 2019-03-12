import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Formik, Field, Form, ErrorMessage} from 'formik'; 

import {TextFieldStatless} from '../../../components/';

import Textfield from '@atlaskit/textfield';

export default class RegForm extends Component {
	constructor() {
		super();

		this.state = {
			initialValues:{
				surname: '',
				name: '',
			},
			values: {
				surname: '',
				name: '',
			},
		};

		this.handleChange = this.handleChange.bind(this);
		this.onHandleReset = this.onHandleReset.bind(this);
		this.validation = this.validation.bind(this);
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

	onHandleReset(event) {
		const {initialValues} = this.state;

		this.setState({
			values: initialValues,
		});
	};

	validation() {
		const {values} = this.state;

		let errors = {};

		if (!values.surname) {
			errors.surname = 'Required';
		};

		return errors;
	};

	onHandleSubmit = values => console.log(values);

	render() {
		const {values, initialValues} = this.state;
console.log(this.state)
		return (
			<Formik
				// validate={this.validation}
				initialValues={initialValues}
				onSubmit={() => this.onHandleSubmit(this.state.values)}
				render={(props) => (
					<form onSubmit={props.handleSubmit} onReset={props.resetForm}>

					<Field
						name="surname"
						render={({field}) => (
							<TextFieldStatless
								{...field}
								type="text"
								label="Фамилия"
								value={values[field.name]}
								handleChange={this.handleChange}
							/>
						)}
					/>
					{props.errors.surname && props.touched.surname && <div>{props.errors.surname}</div>}

					<Field
						name="name"
						render={({field}) => (
							<TextFieldStatless
								{...field}
								type="text"
								label="Имя"
								value={values[field.name]}
								handleChange={this.handleChange}
							/>
						)}
					/>

						<button
							type="submit"
						>
							Отправить
						</button>

						<button
							type="reset"
							onClick={this.onHandleReset}
						>
							Сбросить
						</button>

					</form>
				)}
			/>
		);
	};
};
