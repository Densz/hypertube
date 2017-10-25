import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputForm from "../../../General/components/InputForm";
import "../css/myprofile.css";
import callApi from '../../../ApiCaller/apiCaller';

class ProfileItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            value: this.props.item.value
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput = (event) => {
        event.preventDefault();
        this.setState({
            value: event.target.value
        });
    };

    handleClick = () => {
        console.log("setting active");
        this.setState({
            isActive: true
        });
    };

    handleSubmit = (event) => {
      // event.preventDefault();
      console.log('handle submit');
      this.props.submitData(this.props.name, this.state.value);
      this.setState({
          isActive: false
      });
    };

    handleBlur = () => {
        this.setState({
            value: this.props.item.value,
            isActive: false
        });
    };

    render() {
        let component = this.state.isActive ? (
                <div>
                    <div className="col-md-8">
                        <input autoFocus name={this.props.name} onBlur={this.handleBlur} onInput={this.handleInput} type={this.props.type} value={this.state.value} placeholder={this.props.item.title} />
                        {this.props.item.error !== '' && <span className="form-error-message">{ this.props.item.error }</span>}
                    </div>
                    <div className="col-md-4">
                        <button type="submit">Change {this.props.item.title}</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="col-md-12" onClick={this.handleClick}>
                        {this.props.item.value}
                    </div>
                </div>
            );

        return (
            <form name={this.props.name} onSubmit={this.handleSubmit}>
                <div className="form-row form-group">
                    {component}
                </div>
            </form>
        );
    }
}

class MyProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: {title: 'First Name', value: 'Fake', error: ''},
            lastName: {title: 'Last Name', value: 'Person', error: ''},
            email: {title: 'Email', value: 'fake@spam.com', error: ''},
            login: {title: 'Login', value: 'fakeperson69', error: ''},
            passwd: {title: 'Password', value: '**********', error: ''},
            passwdConfirm: {title: 'Confirm Password', value: '', error: ''},
            language: {title: 'Language', value: 'English', error: ''},
        };
        this.submitData = this.submitData.bind(this);
    }

    submitData = (name, value) => {
        let error = '',
            item = this.state[name];

        if (value === '' || value === undefined) {
            error = "Please enter updated " + item.title.toLowerCase();
        } else {
            //submit to database,
            //if success
            item.value = value;
            //if fail
            // error = "An error occurred when updating " + item.title.toLowerCase();
        }
        this.setState({
            [name]: item
        });
    };

    componentDidMount() {
        let bodyStyle = document.body.style;
        let navBarStyle = document.querySelector('.navbar').style;

        navBarStyle.background = '#20232a';
        bodyStyle.backgroundColor = '#f3f3f3';
    }

    render () {
        return (
            <div className="block-container">
                <div className="container">
                        <div className="row account-section">
                            <div className="col-md-2">
                                <h4>User Details</h4>
                            </div>
                            <div className="col-md-10">
                                <ProfileItem name='login' type='text' item={this.state.login} submitData={this.submitData}/>
                                <ProfileItem name='firstName' type='text' item={this.state.firstName} submitData={this.submitData}/>
                                <ProfileItem name='lastName' type='text' item={this.state.lastName} submitData={this.submitData}/>
                            </div>
                        </div>
                        <div className="row account-section">
                            <div className="col-md-2">
                                <h4>Account Details</h4>
                            </div>
                            <div className="col-md-10">
                                <ProfileItem name='email' type='email' item={this.state.email} submitData={this.submitData}/>
                                <ProfileItem name='password' type='password' item={this.state.passwd} submitData={this.submitData}/>
                                <ProfileItem name='language' type='text' item={this.state.language} submitData={this.submitData}/>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default MyProfile;