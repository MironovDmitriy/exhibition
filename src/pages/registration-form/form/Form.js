import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {TextFieldStatless} from 'proj/components/';
import {SelectField} from 'proj/components/';

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const filedsProps = [{
	name: 'surname',
	label: 'Фамилия',
	type: 'text',
}, {
	name: 'name',
	label: 'Имя',
	type: 'text',
}, {
	name: 'lastname',
	label: 'Отчество',
	type: 'text',
}, {
	name: 'phone',
	label: 'Телефон',
	type: 'tel',
}, {
	name: 'email',
	label: 'Электронный адрес',
	type: 'email',
}, {
	name: 'company',
	label: 'Компания',
	type: 'text',
}, {
	name: 'post',
	label: 'Должность',
	type: 'text',
}];

const options = [
	{value: 'it', label: 'АйТи'},
	{value: 'managment', label: 'Манеджмент'},
	{value: 'other', label: 'Другое'}
];

export default class RegForm extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			values: {
				surname: '',
				name: '',
				lastname: '',
				phone: '',
				email: '',
				company: '',
				post: '',
				activityField: '',
			},
		};

		this.handleChange = this.handleChange.bind(this);
	};

	componentDidUpdate(prevProps, prevState) {
		const {values} = this.state;

		if (values && values !== prevState.values) {
			this.props.onChange(values)
		};
	};

	handleChange(inputValue) {
		const {values} = this.state;

		const newState = {
			...values,
			[inputValue.field]: inputValue.value
		};

		this.setState({values: newState});
	};

	render() {
		const {values} = this.state;

		return (
			<FormContainer>
				<form>
					{filedsProps.map((x, i) => (
						<TextFieldStatless
							key={i}
							type={x.type}
							name={x.name}
							label={x.label}
							value={values[x.name]}
							handleChange={this.handleChange}
						/>
					))}
					<SelectField
						options={options}
						name='activityField'
						value={values.activityField}
						handleChange={this.handleChange}
					/>
				</form>
			</FormContainer>
		);
	};
};
