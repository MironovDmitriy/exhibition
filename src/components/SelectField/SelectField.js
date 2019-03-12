import React, {Component} from 'react';
import styled from 'styled-components';

import Select from '@atlaskit/select';

const customStyles = {
	container(styles) {
		return { ...styles, width: '100%' };
	},
};

const SelectField = ({
	field,
	form,
	handleChange,
	validErr,
	options,
	...props,
}) => {

	const onHandleChange = e => {
		console.log(e)
		const value = e.value;
		handleChange({
			[props.name]: {value: e.value, label: e.label},
		});
	};

	const errMessage = 'Выберите один из вариантов';
console.log(props)
	return (
		<div>
			<label>{props.label}</label>
			<Select
				{...field}
				{...props}
				value={props.value}
				onChange={onHandleChange}
				isInvalid={validErr}
				options={options}
				styles={customStyles}
				isLabelHidden
			/>
			{validErr && <div style={{color: '#DC360C'}}>{errMessage}</div>}
		</div>
	)
};

export default SelectField;