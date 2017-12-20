import React from 'react';
import PropTypes from 'prop-types';
import FlexView from 'react-flexview'
import './input.css';

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      text: undefined
    };
  }

  onChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
  }

  render() {
    const { onSubmit } = this.props;
    return (
      <FlexView className='input' grow>
        <form onSubmit={this.onSubmit}>
          <input type='text' onChange={this.onChange} value={this.state.text || ''} />
        </form>
      </FlexView>
    )
  }
}

Input.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Input;
