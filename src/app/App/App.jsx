import React from 'react';
import FlexView from 'react-flexview';
import PropTypes from 'prop-types';
import Chat from '../Chat';
import './app.css';

const App = () => {


  return (
    <FlexView className='app' column>
      <FlexView className='header' hAlignContent='center' grow >
        <FlexView>
            username
        </FlexView>
      </FlexView>
      <Chat messages={[{ text: 'First message' }]} />
    </FlexView>
  )
}

export default App;
