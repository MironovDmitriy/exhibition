import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {Stage, Layer, Line, Circle} from 'react-konva';
import {
	outerCircleCoordinate,
	outerCirclePointCoordinate,
	rightUpperLineCoordinate,
	rightUpperLinePointCoordinate,
	leftUpperLineCoordinate,
	leftUpperLinePointCoordinate,
	innerCircleCoordinate,
	innerCirclePointCoordinate,
	innerLineCoordinate,
	innerLinePointCoordinate,
	leftTriangleCoordinate,
	leftTrianglePointCoordinate,
	leftTriangleGradient,
	buttonTriangleCoordinate,
	buttonTrianglePointCoordinate,
	rightTriangleCoordinate,
	rightTrianglePointCoordinate,
	rightTriangleGradient,
	squareCoordinate,
	squarePointCoordinate,
	squareGradient,
} from './shapes-coordinate.js';

const MainContainer = styled.div`
	height: 65%;
	z-index: 1;
	margin-left: 14%; // сдвиг из-за ошибки позиционирования координат фигуры;
`;

const getLines = (coordinate, isClosed, gradient) => (
	<Line
		points={coordinate}
		stroke='white'
		strokeWidth={0.2}
		closed={isClosed}
		fillLinearGradientStartPoint={gradient && {x: gradient.start.x, y: gradient.start.y}}
		fillLinearGradientEndPoint={gradient && {x: gradient.end.x, y: gradient.end.y}}
		fillLinearGradientColorStops={gradient && gradient.colors}
	/>
);

const getCirclePoints = coordinate => coordinate.map((point, i) => (
	<Circle
		key={i}
		x={point.x}
		y={point.y}
		radius={3}
		fill='white'
		stroke='white'
		strokeWidth={2}
	/>)
);

export default class CanvasContainer extends PureComponent {
	constructor(props) {
		super(props);

		this.container = React.createRef();

		this.state = {
			containerWidth: null,
			containerHeight: null,
		};
	};

	componentDidMount() {
		this.setState({
			containerWidth: this.container.current.clientWidth,
			containerHeight: this.container.current.clientHeight,
		});
	};

	render() {
		const {
			containerWidth,
			containerHeight,
		} = this.state;

		return (
			<MainContainer ref={this.container}>
				<Stage
					width={containerWidth}
					height={containerHeight}
				>
					<Layer>
						{getLines(outerCircleCoordinate, true)}
						{getLines(rightUpperLineCoordinate, false)}
						{getLines(leftUpperLineCoordinate, false)}
						{getLines(innerCircleCoordinate, true)}
						{getLines(innerLineCoordinate, false)}
						{getLines(leftTriangleCoordinate, true, leftTriangleGradient)}
						{getLines(buttonTriangleCoordinate, true)}
						{getLines(rightTriangleCoordinate, true, rightTriangleGradient)}
						{getLines(squareCoordinate, true, squareGradient)}
						{getCirclePoints(outerCirclePointCoordinate)}
						{getCirclePoints(rightUpperLinePointCoordinate)}
						{getCirclePoints(leftUpperLinePointCoordinate)}
						{getCirclePoints(innerCirclePointCoordinate)}
						{getCirclePoints(innerLinePointCoordinate)}
						{getCirclePoints(leftTrianglePointCoordinate)}
						{getCirclePoints(buttonTrianglePointCoordinate)}
						{getCirclePoints(rightTrianglePointCoordinate)}
						{getCirclePoints(squarePointCoordinate)}
					</Layer>
				</Stage>
			</MainContainer>
		);
	};
};