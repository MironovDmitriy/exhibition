import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	width: 100%;
	margin: 2vh 0 0 0;
	font-size: 1.2em;
`;

const CheckboxField = ({checked, onChange, text}) => {
	return (
		<Container>
			<label>
				<input
					type='checkbox'
					checked={checked}
					onChange={onChange}
				/>
				{text}
			</label>
		</Container>
	);
};

CheckboxField.propTypes = {
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
};

export default CheckboxField;