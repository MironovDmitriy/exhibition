import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	margin: 3px;
`;

const TableContainer = styled.table`
	margin: 15px 0 0 0;
`;

const dataList = [{
	title: 'emotion',
	name: 'Эмоция',
}, {
	title: 'age',
	name: 'Возраст',
}, {
	title: 'gender',
	name: 'Пол',
}];

const getComponent = data => {
	return (
		dataList.map((x, i) => Object.keys(data).find(y => y === x.title) ? (
			<tr key={i}>
				<td>
					<Container>
						{x.name}
					</Container>
				</td>
				<td>
					<Container>
						{data[x.title]}
					</Container>
				</td>
			</tr>
		) : null
	));
};

const Table = ({data}) => {
	return (
		<TableContainer>
			<tbody>
				{data && getComponent(data)}
			</tbody>
		</TableContainer>
	);
};

Table.propTypes = {
	data: PropTypes.object,
};

Table.defaultProps = {
	data: {},
};

export default Table;