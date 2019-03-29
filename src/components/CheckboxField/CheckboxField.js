import React from 'react';
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
			<Checkbox
				{...field}
				{...props}
				isChecked={isChecked}
				onChange={handleChange}
				label="Даю согласие на обработку своих персональных данных"
			/>
		</div>
	);
};

export default CheckboxField;