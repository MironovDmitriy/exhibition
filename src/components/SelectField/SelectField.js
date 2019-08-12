import React from 'react';
import styled from 'styled-components';
import ButtonBase from 'proj/components/ButtonBase';

const Select = styled(ButtonBase)`
	margin: 0 0 4vh 0;
	width: 23vw;
	color: #7A81A0;
	background-color: #FFF;
	border: none;
	font-family: "Russo One";

	:hover {
		cursor: default;
	}
`;

const SelectField = ({options, value, name, handleChange}) => {

	const onHandleChange = e => {
		const value = e.target.value;
		handleChange({field: name, value: value});
	};

	return (
		<Select
			as='select'
			value={value}
			onChange={onHandleChange}
		>
			{options.map((x, i) => (
				<option
					key={i}
					value={x.value}
				>
					{x.label}
				</option>
			))}
		</Select>
	);
};

export default SelectField;