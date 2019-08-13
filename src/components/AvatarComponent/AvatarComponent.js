import React, {PureComponent} from 'react';
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

export default AvatarComponent;