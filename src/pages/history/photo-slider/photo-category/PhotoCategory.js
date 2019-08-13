import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Timer from './timer';
import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import neutrally from 'proj/image/smile-neutrally.png';
import positiv from 'proj/image/smile-positiv.png';
import negative from 'proj/image/smile-negativ.png';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 30px 0 0 0;

	:hover {
		cursor: pointer;
	}
`;

const CategoryInfo = styled.div`
	width: ${props => props.width};
	height: ${props => props.height};
	background: ${props => props.bgColor};
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	color: #EEE;
`;

const TextContainer = styled(Container)`
	height: 80%;
	margin: 0 5px 0 5px;
	border: 1px dashed red;
`

const WIDTH = '65%';
const HEIGHT = 'auto';

const colors = [{
	title: 'neutrally',
	color: 'linear-gradient(to right, #00A9E4, #01D2FD)',
	value: 'Нейтрально',
}, {
	title: 'negative',
	color: 'linear-gradient(to right, #4A5485, #4A5485)',
	value: 'Грусть',
}, {
	title: 'positiv',
	color: 'linear-gradient(to right, #73576C, #694461)',
	value: 'Радость',
}];

const emotionCategorySmile = [{
	title: 'neutrally',
	file: neutrally,
}, {
	title: 'negative',
	file: negative,
}, {
	title: 'positiv',
	file: positiv,
}];

const getCategory = (category, string) => {
	const result = colors.find(x => x.title === category);
	return result[string];
};

export default class PhotoCategory extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			fileName: 1,
			intervalId: null,
			intervalIdOne: null,
			timer: 0,
		};

		this.updateFileName = this.updateFileName.bind(this);
		this.getTimerString = this.getTimerString.bind(this);
	};

	static propTypes = {
		category: PropTypes.string.isRequired,
		isActive: PropTypes.bool.isRequired,
		onClick: PropTypes.func.isRequired,
		onSrcChange: PropTypes.func.isRequired,
		timer: PropTypes.number.isRequired,
	};

	componentDidMount() {
		const intervalId = setInterval(() => this.updateFileName(), this.props.timer);
		const intervalIdOne = setInterval(() => this.getTimerString(), 1);
		this.setState({
			intervalId: intervalId,
			intervalIdOne: intervalIdOne,
		});
	};

	componentDidUpdate(prevProps, prevState) {
		const {fileName} = this.state;
		const {isActive} = this.props;

		if (fileName > 12) {
			clearInterval(this.state.intervalId);
		};

		if (isActive && prevProps.isActive !== isActive) {
			const intervalId = setInterval(() => this.updateFileName(), this.props.timer);
			const intervalIdOne = setInterval(() => this.getTimerString(), 1);
			this.setState({
				intervalId: intervalId,
				intervalIdOne: intervalIdOne,
			});
		};
	};

	onHandleClick = () => this.props.onClick(this.props.category);

	updateFileName() {
		const {category, onSrcChange} = this.props;
		const {fileName} = this.state;

		if (this.state.fileName < 12) {
			onSrcChange(process.env.PUBLIC_URL + `/${category}/${fileName + 1}.png`)
			this.setState({fileName: this.state.fileName + 1});
		} else {
			onSrcChange(process.env.PUBLIC_URL + `/${category}/${1}.png`)
			this.setState({fileName: 1});
		};
	};

	getTimerString() {
		const {timer} = this.props;

		if (this.state.timer === 0) {
			this.setState({timer: timer});
		}

		if (this.state.timer > 0) {
			this.setState({timer: this.state.timer--});
		}
	};

	render() {
		const {fileName, timer} = this.state;
		const {category} = this.props;

		const src = emotionCategorySmile.find(x => x.title === category);

		return(
			<MainContainer
				onClick={this.onHandleClick}
			>
				<img
					width={WIDTH}
					height={HEIGHT}
					src={process.env.PUBLIC_URL + `/${category}/${fileName}.png`} //hardcode
					alt={`Фото №: ${fileName}`}
				/>
				<CategoryInfo
					height='40px'
					width={WIDTH}
					bgColor={getCategory(category, 'color')}
				>
					<Container>
						<TextContainer>
							<img
								width='auto'
								height='60%'
								src={src.file}
								alt='Смайлик эмоции'
							/>
						</TextContainer>
						<TextContainer>
							{getCategory(category, 'value')}
						</TextContainer>
					</Container>
				</CategoryInfo>
				<Timer
					timer={timer}
				/>
			</MainContainer>
		);
	};
};