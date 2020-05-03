import React, { Component } from 'react'
import './AuthenticationForm.css'
import Cookies from 'js-cookie'


const initialState = {
    action: 'SIGN IN',
    toggle: 'Register',
    username: undefined,
    name: undefined,
    email: undefined,
    password: undefined,
    color: undefined,
}

export class AuthenticationForm extends Component {

    constructor(props) {
        super(props)
        this.state = initialState;
    }

    toggleAction = () => {
        this.state.action === 'SIGN IN'
            ? this.setState({ action: 'REGISTER', toggle: 'Signin' })
            : this.setState({ action: 'SIGN IN', toggle: 'Register' })
    }


    onUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    }
    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    setCookies=(user)=>{
        Cookies.set('loggedUser',{
            userid:user.userid,
            username:user.username,
            name:user.name,
            email:user.email,
            color:user.color
        })
    }

    onActionSignin = () => {
        if (!this.state.username || !this.state.password) {
            alert('Some Fields are Empty !')
        }
        else {
            fetch('http://localhost:3000/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            })
                .then(response => response.json())
                .then(user => {

                    if (user._id) {
                        this.setCookies(user);
                        this.props.onRouteChange('Home')
                        this.props.onLoginSuccess(user);
                    }
                    else {
                        alert(user);
                    }
                })
                .catch(err => alert(err))
        }
    }



    onActionRegister = () => {
        if (!this.state.username || !this.state.name || !this.state.email || !this.state.password) {
            alert('Some Fields are Empty !')
        }
        else {
            var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);

            fetch('http://localhost:3000/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                    name: this.state.email,
                    color: randomColor,
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user._id) {
                        this.setCookies(user);
                        this.props.onLoginSuccess(user);
                        this.props.onRouteChange('Home');
                    }
                    else {
                        alert(user);
                    }
                })
        }
    }


    render() {
        return (
            <div className="background form-pos">
                <div className="form-box items-position align-form-items">
                    <br />
                    <label className="title">GUESTBOOK</label>
                    <label style={{ color: '#522424' }}>Username</label>
                    <input onChange={this.onUsernameChange} type="text" id="username" className="input" />
                    {
                        this.state.action === 'REGISTER' ?
                            <div className="items-position align-form-items " style={{ width: '100%' }}>
                                <label style={{ color: '#522424' }}>Full Name</label>
                                <input onChange={this.onNameChange} type="text" id="fullname" className="input" />

                                <label style={{ color: '#522424' }}>Email</label>
                                <input onChange={this.onEmailChange} type="email" id="email" className="input" />
                            </div>
                            : ''
                    }
                    <label style={{ color: '#522424' }}>Password</label>
                    <input onChange={this.onPasswordChange} type="password" className="input" style={{ fontSize: '25px' }} />
                    <button
                        className="button"
                        onClick={this.state.action === 'SIGN IN' ? this.onActionSignin : this.onActionRegister}

                    >{this.state.action}</button>
                    <label className="toggle-btn" onClick={this.toggleAction} >{this.state.toggle}</label>
                    <br />
                </div>
            </div>
        )
    }
}

export default AuthenticationForm

