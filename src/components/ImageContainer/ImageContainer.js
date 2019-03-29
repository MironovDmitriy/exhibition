import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContainerImage = styled.div`
	display: flex;
	border: 1px solid #0c4687;
	border-radius: 5px;
`;

export default class ImageContainer extends Component {
	static propTypes = {
		image: PropTypes.string,
	};

	static defaultProps = {
		image: '',
	};

	render() {
		const {
			image,
			alt,
			width,
			height,
		} = this.props;

	const styles = {
		borderRadius: '5px',
		width: width,
		height: height,
	};

		return (
			<ContainerImage>
				<img
					src={image}
					alt={alt}
					style={styles}
				/>
			</ContainerImage>
		);
	};
};