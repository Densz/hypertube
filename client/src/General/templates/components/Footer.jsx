import React, { Component } from 'react';
import '../css/footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            underlined: {en: true, fr: false}
        };
        this.handleOnClickEvent = this.handleOnClickEvent.bind(this);
    }

    componentDidMount() {
        document.querySelector('#en').style.borderBottom = '2px solid #67DAF9';    // Remplacer #en par la langue favorite     
    }

    handleOnClickEvent(e) {
        const language = e.target.id
        switch(language) {
            case "en": 
                this.props.changeLngToEn();
                document.querySelector('#en').style.borderBottom = '2px solid #67DAF9';
                document.querySelector('#fr').style.borderBottom = '';
                break;
            case "fr": 
                this.props.changeLngToFr();
                document.querySelector('#fr').style.borderBottom = '2px solid #67DAF9';
                document.querySelector('#en').style.borderBottom = '';
                break;
            default : console.log('This language is not supported');
        }
    }
    render() {
        return(
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <p className="col- col-sm-6 col-md-6 col-lg-6  col-xl-6 text-footer"> Languages : <span className="text-footer text-footer-language" id='en' onClick={this.handleOnClickEvent}>English</span> | <span className="text-footer text-footer-language" id='fr' onClick={this.handleOnClickEvent}>Français</span></p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;