import React, { Component } from 'react'
import Message from './Components/Message/Message.js'
import './App.css'
import './Components/TextBox/TextBox.css'
import TextBox from './Components/TextBox/TextBox.js'
import Header from './Components/Header/Header.js'
import AuthenticationForm from './Components/AuthenticationForm/AuthenticationForm.js'
import Cookies from 'js-cookie'


let initialState = {
  input: '',
  action: 'Add',
  actionMsgIndex: undefined,
  msgs: [],
  route: 'Auth',
  loggedUser: {}
}

export class App extends Component {

  constructor(props) {
    super(props)

    this.state = initialState;
  }

  componentDidMount() {
    const loggedUserCookies = Cookies.getJSON('loggedUser');
    if (loggedUserCookies) {
      this.setState({ route: 'Home', loggedUser: loggedUserCookies })
    }

    this.loadMessages();

  }



  loadMessages = () => {
    fetch('http://localhost:3000/messages')
      .then(response => response.json())
      .then(msgs => {

        this.setState(Object.assign(this.state, { msgs }))
      })

  }

  onRouteChange = (route) => {
    if (route === 'Auth') {
      Cookies.remove('loggedUser')
    }

    this.setState({ route })
  }

  getLoggeduser = (user) => {
    this.setState({ loggedUser: user })
  }

 
  getEditMsg = (index, event) => {

    const msgContent = this.state.msgs[index].msg;

    this.setState({
      action: 'Edit',
      input: msgContent,
      actionMsgIndex: index
    })
  }

  getReplyMsg = (index, event) => {

    const username = this.state.msgs[index].user.username;

    this.setState({
      action: 'Reply',
      actionMsgIndex: index,
      input: '@' + username + ' ',
    })
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onAcionAdd = () => {

    const { input, loggedUser, actionMsgIndex, msgs, action } = this.state;
    if (input === '') return;

    let repliedmsgInfo = {}
    const date = new Date().toLocaleString();


    if (action === 'Reply') {
      const { user, msg ,_id} = msgs[actionMsgIndex];
      const {username,color} = user;
      repliedmsgInfo = {_id, username, msg, color }

    }

    fetch('http://localhost:3000/addMessage', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          username: loggedUser.username,
          color: loggedUser.color,
        },
        date: date,
        msg: input,
        repliedmsgInfo: repliedmsgInfo
      })
    })
      .then(response => response.json())
      .then(_message => {

        if (_message !== 'cannot insert the msg') {

          this.setState({
            msgs: [...msgs, _message]
          })
        }
        else {
          alert('Something went wrong !');
        }
      })
      .catch(err => alert('Something went wrong !'))
  }

  onAcionEdit = () => {
    const { input, msgs, actionMsgIndex } = this.state;
    const date = new Date().toLocaleString();

    fetch('http://localhost:3000/editMessage', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: this.state.msgs[actionMsgIndex]._id,
        date: date,
        msg: input,
      })
    })
      .then(response => response.json())
      .then(data => {

        if (data !== 'cannot update the msg') {
          let msg = { ...this.state.msgs[actionMsgIndex] }

          msg.msg = input;
          msg.date = date;

          msgs[actionMsgIndex] = msg;
          this.setState({ msgs })
        }
        else {
          alert('Something went wrong !');
        }

      })
      .catch(err => alert('Something went wrong !'));
  }

  deleteMessage = (index, event) => {


    fetch('http://localhost:3000/deleteMessage', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id:this.state.msgs[index]._id ,
      })
    })
      .then(response => response.json())
      .then(result => {
        if (result !=null || result !== 'cannot delete the msg') {
          const msgs = [...this.state.msgs];
          msgs.splice(index, 1);
          this.setState({ msgs });
        }
      })
      .catch(err => alert('Something went wrong !'))
  }


  onSendClick = () => {
    if (this.state.action === 'Add' || this.state.action === 'Reply') {
      this.onAcionAdd();
    }
    else if (this.state.action === 'Edit') {
      this.onAcionEdit();
    }
    this.setState({ input: '', action: 'Add', actionMsgIndex: undefined })
  }

  cancelAction = () => {
    this.setState({
      action: 'Add',
      input: '',
      actionMsgIndex: undefined
    })
  }

  render() {

    return (
      <div className="App">
        {
          this.state.route === 'Auth'
            ?
            <AuthenticationForm
              onRouteChange={this.onRouteChange}
              onLoginSuccess={this.getLoggeduser}
            />
            :
            <div>
              <Header onRouteChange={this.onRouteChange} />
              <div className="msgs-position">
                {this.state.msgs.map((msg, index) => (

                  <Message
                    key={msg._id}
                    sameUser={msg.user.username === this.state.loggedUser.username}
                    delEvent={this.deleteMessage.bind(this, index)}
                    editMessage={this.getEditMsg.bind(this, index)}
                    replyMessage={this.getReplyMsg.bind(this, index)}
                    msg={msg}
                  />
                ))}
              </div>

              <TextBox
                cancelAction={this.cancelAction}
                onInputChange={this.onInputChange}
                onSendClick={this.onSendClick}
                input={this.state.input}
                action={this.state.action}
              />
            </div>
        }
      </div>
    )
  }
}

export default App
