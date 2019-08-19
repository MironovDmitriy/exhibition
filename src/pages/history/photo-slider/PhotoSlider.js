import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 65%;
	margin: 3vh;
	font-family: "Russo One";
	color: #EEE;
`;

const ItemBorder = styled.div`
	border: ${props => props.isActive ? '2px solid #566FD9' : 'none'};
`

const InfoContainer = styled(ItemContainer)`
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 5vh;
	margin: 0;
	background: ${props => props.bgColor};
`;

const TextContainer = styled.div`
	margin: 0 3px 0 3px;
`;

const TimeContainer = styled.div`
	margin: 1vh 0 0 0;
	font-size: 0.8em;
	color: #EEE;
`;

const getRandomTimer = (min, max) => Math.round(Math.random() * (max - min) + min);

export default class PhotoSlider extends PureComponent {
	constructor() {
		super();

		this.state = {
			intervalId: null,
			timerIntervalId: null,
			fileName: 1,
			timer: getRandomTimer(500, 1000),
			timeToChange: 0,
		};

		this.getImgSrc = this.getImgSrc.bind(this);
	};

	static propTypes = {
		isActive: PropTypes.bool.isRequired,
		onActiveChange: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const intervalId = setInterval(() => this.getImgSrc(), this.state.timer);
		const timerIntervalId = setInterval(() => this.getTimerString(), 1);
		this.setState({intervalId: intervalId, timerIntervalId: timerIntervalId});
	};

	componentWillUnmount() {
		clearInterval(this.state.intervalId)
		clearInterval(this.state.timerIntervalId)
	};

	getImgSrc() {
		const {fileName} = this.state;
		const {title, onSrcChange, isActive} = this.props;

		if (fileName < 12) { //hardcode
			isActive && onSrcChange({fileName: fileName + 1, title: title});
			this.setState({fileName: fileName + 1});
		} else {
			isActive && onSrcChange({fileName: 1, title: title});
			this.setState({fileName: 1});
		};
	};

	getTimerString() {
		const {timer, timeToChange} = this.state;

		if (timeToChange <= 0) {
			this.setState({timeToChange: timer});
		} else {
			this.setState({timeToChange: timeToChange - 8});
		}
	};

	onHandleClick = () => this.props.onActiveChange(this.props.title);

	render() {
		const {emotion, title, color, smile, isActive} = this.props;
		const {fileName, timeToChange} = this.state;
		const date = new Date();
		const zero = date.getMonth() < 10 ? 0 : '';
		const timeString = `${date.getDate()}.${zero}${date.getMonth() + 1}.${date.getFullYear()}
		/ ${date.getHours()}:${date.getMinutes()}`

		return (
			<ItemContainer onClick={this.onHandleClick}>
				<ItemBorder isActive={isActive}>
					<img
						width='100%'
						height='auto'
						src={process.env.PUBLIC_URL + `/${title}/${fileName}.png`}
						alt='Миниатюра фотографии'
					/>
					<InfoContainer bgColor={color}>
						<TextContainer>
							<img src={smile} alt='Иконка смайл' />
						</TextContainer>
						<TextContainer>
							{emotion}
						</TextContainer>
					</InfoContainer>
				</ItemBorder>
				<TimeContainer>
					<TextContainer>
					{timeString}
					</TextContainer>
					<TextContainer>
					{timeToChange}
					</TextContainer>
				</TimeContainer>
			</ItemContainer>
		);
	};
};
