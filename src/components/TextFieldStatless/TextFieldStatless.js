import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonBase from 'proj/components/ButtonBase';

const TextField = styled(ButtonBase)`
	margin: 0 0 4vh 0;
	padding: 0 0 0 30px;
	width: 23vw;
	color: #7A81A0;
	background-color: #FFF;
	border: none;

	:hover {
		cursor: text;
	}

	:focus {
		outline: none;
	}

	::placeholder {
		color: #7A81A0;
	}
`;

const TextFieldStatless = ({type, label, name, value, onChange}) => {

	const onHandleChange = e => {
		const value = e.target.value;
		onChange({field: name, value: value});
	};

	return (
		<TextField as='input'
			type={type}
			value={value}
			name={name}
			placeholder={label}
			onChange={onHandleChange}
		/>
	);
};

TextFieldStatless.propTypes = {
	type: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default TextFieldStatless;