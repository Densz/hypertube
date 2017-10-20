import React from "react";
import PropTypes from 'prop-types';

const ChangeButton = (active, itemName, handleClick) => {
    var className = active ? 'button-active' : 'button-inactive';

    return (
        <button className={className} onClick={handleClick}>Change {itemName}</button>
    );
};

class ProfileItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    activate() {
        this.setState({
            active: true
        });
    }

    render() {
        return (
            <div className='profile-item'>props.value<ChangeButton itemName={this.props.itemName} active={this.state.active} handleClick={this.activate} /></div>
        );
    }
}

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // set data from db
            username: 'sampleperson69',
            photo: '/src_of_photo.png',
            name: 'Sample Person',
            email: 'sample@realpeople.com',
            lang: 'en'
        };
    }

    changeEmail(e) {
        var newEmail = e.target.value;
        //validate newEmail
        //change in db and if successful
        this.setState = ({
            email: {newEmail}
        });
    }

    changeName(e) {
        var newEmail = e.target.value;
        //change in db and if successful
        this.setState = ({
            email: {newEmail}
        });
    }

    changeEmail(e) {
        var newEmail = e.target.value;
        //change in db and if successful
        this.setState = ({
            email: {newEmail}
        });
    }

    render() {
        return (
            <div>
                <Title title='My Profile' />
                <ProfileItem itemName='username' value={this.state.username} change={this.changeUsername} />
                <ProfileItem itemName='name' value={this.state.name} change={this.changeName} />
                <ProfileItem itemName='email' value={this.state.email} change={this.changeEmail} />
                <ProfileItem itemName='password' value={this.state.password} change={this.changePassword} />
                <ProfileItem itemName='language' value={this.state.language} change={this.changeLanguage} />
            </div>
        );
    }
}