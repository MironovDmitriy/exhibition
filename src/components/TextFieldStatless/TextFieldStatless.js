import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextFieldStatless = ({
	field,
	form,
	handleChange,
	...props,
}) => {
	// console.log(field)
	// console.log(form)
	// console.log(props)

	const onHandleChange = e => {
		const value = e.target.value;
		handleChange({field: props.name, value: value});
	};

	return (
		<div>
			<label>{props.label}</label>
			<input
				{...field}
				{...props}
				value={props.value}
				onChange={onHandleChange}
			/>
		</div>
	)
};

export default TextFieldStatless;