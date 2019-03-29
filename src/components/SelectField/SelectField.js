import React from 'react';
import Select from '@atlaskit/select';

const styles = {
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
		handleChange({
			[props.name]: {value: e.value, label: e.label},
		});
	};

	const errMessage = 'Выберите один из вариантов';

	return (
		<div>
			<label>{props.label}</label>
			<Select
				{...field}
				{...props}
				value={props.value}
				onChange={onHandleChange}
				validationState={validErr}
				options={options}
				styles={styles}
				isLabelHidden
			/>
			{validErr && <div style={{color: '#DC360C'}}>{errMessage}</div>}
		</div>
	);
};

export default SelectField;