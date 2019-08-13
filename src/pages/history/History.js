import React, {PureComponent} from 'react';
import {PageContainer as PageContainerMain} from '../../components';
import styled from 'styled-components';
import PhotoSlider from './photo-slider';
import neutrally from 'proj/image/smile-neutrally.png';
import positiv from 'proj/image/smile-positiv.png';
import negative from 'proj/image/smile-negativ.png';

const SliderContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 27%;
	background-color: #36385F;
`;

const emotionsCategory = [{
	title: 'neutrally',
	value: 'Нейтрально',
	color: 'linear-gradient(to right, #00A9E4, #01D2FD)',
	smileFile: neutrally,
}, {
	title: 'positiv',
	value: 'Радость',
	color: 'linear-gradient(to right, #f1775b, #f2512c)',
	smileFile: positiv,
}, {
	title: 'negative',
	value: 'Грусть',
	color: 'linear-gradient(to right, #573faf, #745ad2)',
	smileFile: negative,
}];

export default class History extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			fileName: 1,
			title: 'neutrally',
			isActive: 'neutrally',
		};

		this.onChange = this.onChange.bind(this);
		this.onActiveChange = this.onActiveChange.bind(this);
	};

	onChange = value => this.setState({fileName: value.fileName, title: value.title});

	onActiveChange = value => this.setState({isActive: value});

	render() {
		const {fileName, title, isActive} = this.state;

		return(
			<PageContainerMain>
				<SliderContainer>
					{emotionsCategory.map((x, i) => {
						return (
							<PhotoSlider
								key={i}
								isActive={isActive === x.title}
								emotion={x.value}
								title={x.title}
								color={x.color}
								smile={x.smileFile}
								onSrcChange={this.onChange}
								onActiveChange={this.onActiveChange}
							/>
						)}
					)}
				</SliderContainer>
				<img
					width='100%'
					height='auto'
					src={process.env.PUBLIC_URL + `/${title}/${fileName}.png`}
					alt='Фото'
				/>
			</PageContainerMain>
		);
	};
};