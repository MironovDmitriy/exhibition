import React, {PureComponent} from 'react';
import {PageContainer as PageContainerMain} from '../../components';
import PhotoSlider from './photo-slider';

export default class History extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			imgSrc: process.env.PUBLIC_URL + '/neutrally/1.png',
		};

		this.onChange = this.onChange.bind(this);
	};

	onChange = value => this.setState({imgSrc: value});

	render() {
		const {imgSrc} = this.state;

		return(
			<PageContainerMain>
				<PhotoSlider
					onSrcChange={this.onChange}
				/>
				<img
					width='100%'
					height='auto'
					src={imgSrc}
					alt='Фото' />
			</PageContainerMain>
		);
	};
};