import React from 'react';
import {FieldTextStateless} from '@atlaskit/field-text';

const PhotoUpload = ({
	field,
	form,
	handleChange,
	getImgSrc,
	validErr,
	...props,
}) => {

	const onHandleChange = e => {
		const value = e.target.value;
		handleChange({field: props.name, value: value});
		getImgSrc(e)
	};

	const errMessage = 'Загрузите Вашу фотографию';

	return (
		<div>
			<label>{props.label}</label>
			<FieldTextStateless
				{...field}
				{...props}
				value={props.value}
				onChange={onHandleChange}
				isInvalid={validErr}
				shouldFitContainer
				isLabelHidden
			/>
			{validErr && <div style={{color: '#DC360C'}}>{errMessage}</div>}
		</div>
	);
};

export default PhotoUpload;