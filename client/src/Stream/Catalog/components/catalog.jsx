import React, { Component } from 'react';
import Thumbnail from './thumbnail';
import '../css/catalog.css';

const catalogtest = {
    img: "https://yts.ag/assets/images/movies/war_for_the_planet_of_the_apes_2017/medium-cover.jpg",
    title: "Planet des singes",
    rating: "3",
}

class Catalog extends Component {
    componentDidMount() {
        let bodyStyle = document.body.style;

        bodyStyle.backgroundColor = '#20232a';
    }
    
    render() {
        return (
            <div className="row ">
                <Thumbnail infos={catalogtest}/>
                <Thumbnail infos={catalogtest}/>
            </div>                
        )
    }
}

export default Catalog;