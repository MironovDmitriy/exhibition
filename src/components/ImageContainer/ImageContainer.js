import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContainerImage = styled.div`
	display: flex;
	margin: 3px;
	border: 1px solid black;
	border-radius: ${props => props.isSquare ? '0' : "5px"};
`;

export default class ImageContainer extends Component {

	static propTypes = {
		image: PropTypes.string.isRequired,
	};

	static defaultProps = {
		image: '',
	};

	render() {
		const {image, alt, width, height, isSquare} = this.props;

		return (
			<ContainerImage>
				<img
					src={image}
					width={width}
					height={height}
					alt={alt}
					style={isSquare ? null : {borderRadius: "5px"}}
				/>
			</ContainerImage>
		);
	};
};