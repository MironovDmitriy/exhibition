import React from 'react';

import {FieldTextStateless} from '@atlaskit/field-text';

const TextFieldStatless = ({
	field,
	form,
	handleChange,
	validErr,
	autoFocus,
	...props,
}) => {

	const onHandleChange = e => {
		const value = e.target.value;
		handleChange({field: props.name, value: value});
	};

	const errMessage = 'Поле обязательное для заполнения';

	return (
		<div>
			<label>{props.label}</label>
			<FieldTextStateless
				{...field}
				{...props}
				value={props.value}
				onChange={onHandleChange}
				isInvalid={validErr}
				autoFocus={autoFocus}
				shouldFitContainer
				isLabelHidden
			/>
			{validErr && <div style={{color: '#DC360C'}}>{errMessage}</div>}
		</div>
	);
};

export default TextFieldStatless;