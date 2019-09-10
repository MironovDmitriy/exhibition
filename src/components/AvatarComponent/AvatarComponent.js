import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@atlaskit/avatar';

const AvatarComponent = ({src}) => {
	return (
		<Avatar
			appearance="circle"
			size="xlarge"
			src={src}
		/>
	);
};

AvatarComponent.propTypes = {
	src: PropTypes.string,
};

AvatarComponent.defaultProps = {
	src: '',
};

export default AvatarComponent;