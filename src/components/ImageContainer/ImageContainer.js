import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContainerImage = styled.div`
	display: flex;
	margin: 3px;
	border: 1px solid black;
`;

export default class ImageContainer extends Component {

	static propTypes = {
		image: PropTypes.string.isRequired,
	};

	static defaultProps = {
		image: '',
	};

	render() {
		const {image, alt, width, height} = this.props;

		return (
			<ContainerImage>
				<img src={image} width={width} height={height} alt={alt}/>
			</ContainerImage>
		);
	};
};