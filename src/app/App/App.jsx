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
      }, () => {
        store.addMessage(data);
      });
    });
    socket.on('delete-last-message', () => {
      const messages = this.state.messages.slice(0,   this.state.messages.length - 1);
      this.setState({ messages }, () => {
        store.setMessages(messages);
      });
    });
    socket.on('username-updated', (data) => {
      if (data.userId !== store.getUserId()) {
        this.setState({ username: data.username });
      }
    });
    if (!store.getUserId()) {
      store.setUserId(randomUsername());
    }
    socket.emit('username-updated', { userId: store.getUserId(), username: store.getUserId() });
  }

  render() {
    const { messages, username } = this.state;
    return (
      <FlexView className='app' column>
        <FlexView className='header' hAlignContent='center' grow >
          <FlexView>
              {username || 'anonymous'}
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
      socket.emit('username-updated', { userId: store.getUserId(), username });
    } else if (text.startsWith('/think ')) {
      const message = {
        userId: store.getUserId(),
        text: text.replace('/think ', ''),
        type: 'think'
      };

      store.addMessage(message);
      socket.emit('new-message', message);
    } else if (text.startsWith('/oops')) {
      socket.emit('delete-last-message');
    } else {
      const message = {
        userId: store.getUserId(),
        text,
        type: 'default'
      };
      store.addMessage(message);
      socket.emit('new-message', message);
    }
  }

}
