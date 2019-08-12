import React from 'react';
import {Checkbox} from '@atlaskit/checkbox';
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
			<Checkbox
				isChecked={checked}
				onChange={handleChange}
			/>
			<div>Даю согласие на обработку своих персональных данных</div>
		</Container>
	);
};

export default CheckboxField;