import React from 'react';
import PropTypes from 'prop-types';
import FlexView from 'react-flexview';
import './chat.css';

const renderMessage = (message, i) => {
  const direction = 'sent';
  const hAlign = 'right';
  return (
    <FlexView key={i} className={`message ${direction}`} hAlignContent={hAlign}>
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
    text: PropTypes.string.isRequired
  })).isRequired
}

export default Chat;
