import React, { Component } from 'react';

class NotFound extends Component {
	componentDidMount() {
		const bodyStyle = document.body.style;

		bodyStyle.backgroundImage =  "url('https://images.hellogiggles.com/uploads/2016/08/26050437/2d04c5b9449d3253_thing.jpg')";
        bodyStyle.backgroundRepeat = 'no-repeat';
        bodyStyle.backgroundColor = 'black';
		bodyStyle.backgroundSize = 'cover';
	}

	render() {
		return (
			<div>
				<h1>Oops!</h1>
			</div>
		);
	}
}

export default NotFound;