import React from 'react';
import styled from 'styled-components';
import ButtonBase from 'proj/components/ButtonBase';

const TextField = styled(ButtonBase)`
	margin: 0 0 4vh 0;
	padding: 0 0 0 30px;
	width: 23vw;
	color: #7A81A0;
	background-color: #FFF;
	border: none;
	font-variant: small-caps;
	font-weight: 100;

	:hover {
		cursor: text;
	}

	:focus {
		outline: none;
	}

	::placeholder {
		color: #7A81A0;
		font-variant: small-caps;
		font-weight: 100;
	}
`;

const TextFieldStatless = ({type, label, name, value, handleChange}) => {

	const onHandleChange = e => {
		const value = e.target.value;
		handleChange({field: name, value: value});
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

export default TextFieldStatless;