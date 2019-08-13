import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PhotoCategory from './photo-category';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 27%;
	background-color: #36385F;
`;

const TextContainer = styled.div`
	width: 65%;
	margin: 20px 0 0 0;
	font-family: "Russo One";
	color: #EEE;
`;

const emotionsCategory = [
	'neutrally',
	'negative',
	'positiv',
];

const timer = 700;

export default class PhotoSlider extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			selectedCategory : 'neutrally',
		};

		this.onHandleClick = this.onHandleClick.bind(this);
	};

	static propTypes = {
		onSrcChange: PropTypes.func.isRequired,
	};

	onHandleClick = category => this.setState({selectedCategory: category});

	onChange = value => this.props.onSrcChange(value);

	render() {
		const {selectedCategory} = this.state;

		return(
			<MainContainer>
				<TextContainer>
					Всего {emotionsCategory.length}
				</TextContainer>
				{emotionsCategory.map((category, i) => (
					<PhotoCategory
						key={i}
						category={category}
						isActive={selectedCategory === category}
						onClick={this.onHandleClick}
						onSrcChange={this.onChange}
						timer={timer+(i+1)*200}
					/>
				))}
			</MainContainer>
		);
	};
};