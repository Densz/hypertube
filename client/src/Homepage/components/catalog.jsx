import React, { Component } from 'react';
import '../css/catalog.css';

class Catalog extends Component {
    constructor(props) {
        super(props);
        let bodyStyle = document.body.style;
		bodyStyle.backgroundColor = 'black';
    }

    render() {
        return (
            <div>
                <p>Test</p>
            </div>                
        )
    }
}

export default Catalog;