import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonBase from 'proj/components/ButtonBase';

const Select = styled(ButtonBase)`
	margin: 0 0 4vh 0;
	padding: 0 0 0 30px;
	width: 25vw;
	color: #7A81A0;
	background-color: #FFF;
	border: none;

	:hover {
		cursor: default;
	}

	:focus {
		outline: none;
	}
`;

const SelectField = ({options, value, name, onChange}) => {

	const onHandleChange = e => {
		const value = e.target.value;
		onChange({field: name, value: value});
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

SelectField.propTypes = {
	options: PropTypes.array.isRequired,
	value: PropTypes.string,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

SelectField.defaultProps = {
	value: '',
};

export default SelectField;