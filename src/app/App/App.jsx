import React from 'react';
import FlexView from 'react-flexview';
import PropTypes from 'prop-types';
import './app.css';

const App = () => {
  return (
    <FlexView className='app' column>
      <FlexView className='header' hAlignContent='center' grow >
        <FlexView>
            username
        </FlexView>
      </FlexView>
    </FlexView>
  )
}

export default App;
