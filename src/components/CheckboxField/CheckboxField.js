import React from 'react';
import styled from 'styled-components';

import {Checkbox} from '@atlaskit/checkbox';

const CheckboxField = ({
	field,
	form,
	isChecked,
	handleChange,
	...props,
}) => {

	return (
		<div>
			<label>{props.label}</label>
			<Checkbox
				{...field}
				{...props}
				isChecked={isChecked}
				onChange={handleChange}
				label="Даю согласие на обработку своих персональных данных"
			/>
		</div>
	)
};

export default CheckboxField;