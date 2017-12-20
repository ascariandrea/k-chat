import React from 'react';
import FlexView from 'react-flexview';
import PropTypes from 'prop-types';
import Chat from '../Chat';
import Input from '../Input';
import { store } from '../utils';
import './app.css';



export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    messages: store.getMessages()
    }
    this.onInputSubmit = this.onInputSubmit.bind(this);
  }

  render() {
    const { messages } = this.state;
    return (
      <FlexView className='app' column>
        <FlexView className='header' hAlignContent='center' grow >
          <FlexView>
              username
          </FlexView>
        </FlexView>
        <Chat messages={messages} />
        <Input onSubmit={this.onInputSubmit}/>
      </FlexView>
    );
  }

  onInputSubmit(text) {

  }

}
