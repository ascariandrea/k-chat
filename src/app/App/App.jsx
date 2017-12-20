import React from 'react';
import FlexView from 'react-flexview';
import PropTypes from 'prop-types';
import './app.css';

const App = () => {
  return (
    <FlexView>
      <FlexView className='header'>
        <FlexView>
            username
        </FlexView>
      </FlexView>
    </FlexView>
  )
}

export default App;
