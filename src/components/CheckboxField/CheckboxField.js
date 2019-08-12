import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	width: 100%;
	margin: 2vh 0 0 0;
	font-family: "Russo One";
	font-size: 1.2em;
`;

const CheckboxField = ({checked, handleChange}) => {
	return (
		<Container>
			<label>
				<input
					type='checkbox'
					checked={checked}
					onChange={handleChange}
				/>
				Даю согласие на обработку своих персональных данных
			</label>
		</Container>
	);
};

export default CheckboxField;