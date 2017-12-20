import React from 'react';
import FlexView from 'react-flexview';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import Chat from '../Chat';
import Input from '../Input';
import { store, randomUsername } from '../utils';
import './app.css';

const ENDPOINT = 'http://localhost:4001';

let socket;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: store.getGuestUsername(),
      messages: store.getMessages()
    }
    this.onInputSubmit = this.onInputSubmit.bind(this);
  }

  componentDidMount() {
    socket = socketIOClient(ENDPOINT);
    socket.on('new-message', (data) => {
      this.setState({
        messages: this.state.messages.concat(data)
      });
    })
    socket.on('username-updated', (username) => {
      if (username !== store.getUsername()) {
        this.setState({ username });
      }
    });
    if (!store.getUsername()) {
      store.setUsername(randomUsername());
      socket.emit('username-updated', store.getUsername());
    }
  }

  render() {
    const { messages, username } = this.state;
    return (
      <FlexView className='app' column>
        <FlexView className='header' hAlignContent='center' grow >
          <FlexView>
              {username}
          </FlexView>
        </FlexView>
        <Chat messages={messages} />
        <Input onSubmit={this.onInputSubmit}/>
      </FlexView>
    );
  }

  onInputSubmit(text) {
    if (text.startsWith('/nick ')) {
      const username = text.replace('/nick ', '');
      store.setUsername(username);
      socket.emit('username-updated', username);
    } else if (text.startsWith('/think ')) {
      const message = {
        username: store.getUsername(),
        text: text.replace('/think ', ''),
        type: 'think'
      };

      store.addMessage(message);
      socket.emit('new-message', message);
    } else {
      const message = {
        username: store.getUsername(),
        text,
        type: 'default'
      };
      store.addMessage(message);
      socket.emit('new-message', message);
    }
  }

}
