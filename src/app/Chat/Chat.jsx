import React from 'react';
import PropTypes from 'prop-types';
import FlexView from 'react-flexview';
import { store } from '../utils';
import './chat.css';

const renderMessage = (message, i) => {
  const isMe = store.getUsername() === message.username;
  const direction = isMe ? 'sent' : 'received';
  const hAlign = isMe ? 'right' : 'left';

  return (
    <FlexView key={i} className={`message ${direction} ${message.type}`} hAlignContent={hAlign}>
      <div className='text'>
        {message.text}
      </div>
    </FlexView>
  );
}

class Chat extends React.Component {

  render() {
    const { messages } = this.props;
    return (
      <FlexView className='chat' column>
        {messages.map(renderMessage)}
      </FlexView>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'think']).isRequired
  })).isRequired
}

export default Chat;
