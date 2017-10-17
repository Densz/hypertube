import React, { Component } from 'react';
import '../css/catalog.css';

const catalogtest = {
    img: "https://yts.ag/assets/images/movies/war_for_the_planet_of_the_apes_2017/medium-cover.jpg",
    title: "Planet des singes",
    rating: "3",
}

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false
        }
        this.showInfo = this.showInfo.bind(this);

        let bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';
    }

    showInfo() {
        this.setState((prevState) => ({
            isToggleOn: !prevState.isToggleOn,
        }))
    }
    
    
    render() {
        return (
            <div className="row">
                <div className="movie-container">
                    <img alt={catalogtest.title} src={catalogtest.img} onMouseEnter={this.showInfo} onMouseLeave={this.showInfo}/>
                    { this.state.isToggleOn &&
                        <div className="about-movie" >
                            <p className="movie-title">{catalogtest.title}</p>
                            <p className="movie-rating">{catalogtest.rating}</p>
                        </div>
                    }
                </div>
                <div className="movie-container">
                    <img alt={catalogtest.title} src={catalogtest.img} onMouseEnter={this.showInfo} onMouseLeave={this.showInfo}/>
                    { this.state.isToggleOn &&
                        <div className="about-movie" >
                            <p className="movie-title">{catalogtest.title}</p>
                            <p className="movie-rating">{catalogtest.rating}</p>
                        </div>
                    }
                </div>
            </div>                
        )
    }
}

export default Catalog;