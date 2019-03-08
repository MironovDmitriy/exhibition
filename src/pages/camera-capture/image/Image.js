import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {WIDTH, HEIGHT} from '../../../constants';

const ImageContainer = styled.div`
	display: flex;
	margin: 3px;
	border: 1px solid black;
`;

export default class Image extends Component {
	
	static propTypes = {
		image: PropTypes.string.isRequired,
	};

	static defaultProps = {
		image: '',
	};

	render() {
		const {image} = this.props;

		return (
			<ImageContainer>
				<img src={image} width={WIDTH} height={HEIGHT} alt={'Скриншот'}/>
			</ImageContainer>
		);
	};
};