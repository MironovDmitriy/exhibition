import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TimeContainer = styled.div`
	width: 65%;
	margin: 10px 0 0 0;
	font-size: 0.8em;
	color: #EEE;
	opacity: 0.5;
`;

export default class Timer extends PureComponent {
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		intervalId: null,
	// 		timer: this.props.timer,
	// 	};

	// 	// this.getTimerString = this.getTimerString.bind(this);
	// };

	static propTypes = {
		timer: PropTypes.number.isRequired,
	};

	// componentDidUpdate(prevProps, prevState) {
		
	// };

	render() {
		// const {timer} = this.state;
		const date = new Date();
		const zero = date.getMonth() + 1 < 10 ? 0 : '';
		const timeString = `${date.getDate()}.${zero}${date.getMonth()+1}.${date.getFullYear()} /
		${date.getHours()}:${date.getMinutes()}`;

		return (
			<TimeContainer>
				<div>{timeString}</div>
				<div>{this.props.timer}</div>
			</TimeContainer>
		);
	};
};
