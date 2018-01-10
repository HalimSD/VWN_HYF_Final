import React, { Component } from 'react';

class SuccessfullAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            y: 0
        }
    }

    render() {
        let radius = Math.min(this.props.width, this.props.height) / 2;
        let strokeWidth = radius / 20;
        let cx = this.props.width / 2;
        let cy = this.props.height / 2;

        return(
            <div>
                <div width="600" height="400">
            <svg ref="svg" {...this.props} onMouseMove={this.handleMouseMove.bind(this)}>
            {this.renderHead(cx, cy, radius, strokeWidth)}
            {this.renderEye(cx - radius / 3, cy - radius / 5, radius / 4, strokeWidth)}
            {this.renderEye(cx + radius / 3, cy - radius / 5, radius / 4, strokeWidth)}
            {this.renderMouth(cx - 0.6 * radius, 1.3 * radius, 1.2 * radius, strokeWidth)}
        </svg>
        </div>
        <div className = "submitMessage">
        <h1>
            Your request has been submitted successfully and waiting for admin approval meanwhile enjoy the beautiful smiley eyes
        </h1>
        </div>
        </div>
        );
    }

    renderHead(cx, cy, radius, strokeWidth) {
        return <circle cx={cx} cy={cy} r={radius - 10} fill="gold" stroke="black" strokeWidth={strokeWidth} />;
    }

    renderEye(cx, cy, radius, strokeWidth) {
        let angle = Math.atan2(this.state.y - cy, this.state.x - cx); // angle
        let bcx = cx + radius / 2 * Math.cos(angle);
        let bcy = cy + radius / 2 * Math.sin(angle);
        return [
            <circle key="eye" cx={cx} cy={cy} r={radius} fill="white" stroke="black" strokeWidth={strokeWidth} />,
            <circle key="eyeball" cx={bcx} cy={bcy} r={radius / 2} fill="black" />
        ];
    }

    renderMouth(left, top, width, strokeWidth) {
        let bottom = top + width * 2 / 5;
        let path = `M${left} ${top} C ${left + 0.25 * width} ${bottom}, ${left + 0.75 * width} ${bottom}, ${left + width} ${top}`;
        return <path d={path} stroke="black" strokeWidth={strokeWidth} fill="transparent" />;
    }

    handleMouseMove(event) {
        let svg = React.findDOMNode(this.refs.svg);
        let rect = svg.getBoundingClientRect();
        this.setState({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    }
}

export default SuccessfullAdd;