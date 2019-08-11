import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {PageContainer as PageContainerMain} from '../../components';
import PhotoSlider from './photo-slider';

export default class History extends PureComponent {
	render() {
		return(
			<PageContainerMain>
				<PhotoSlider />
			</PageContainerMain>
		);
	};
};