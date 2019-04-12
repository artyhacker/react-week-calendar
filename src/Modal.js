import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  value: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const defaultProps = {
  value: '',
};


class Modal extends React.Component {
  state = {
    start: '',
    end: '',
  };

  handleRemove = () => {
    this.props.onRemove();
  }

  handleSave = () => {
    const { value } = this.input;
    const values = { value };

    if (this.state.start) {
      const startNumbers = this.state.start.split(':')
        .map(s => parseInt(s, 10));
      values.start = this.props.start.hour(startNumbers[0])
        .minute(startNumbers[1]);
    }

    if (this.state.end) {
      const endNumbers = this.state.end.split(':')
        .map(s => parseInt(s, 10));
      values.end = this.props.end.hour(endNumbers[0])
        .minute(endNumbers[1]);
    }

    this.props.onSave(values);
  }

  renderText() {
    const {
      start,
      end,
    } = this.props;

    if (start.isSame(end, 'day')) {
      return (<span>{`${start.format('Do MMM., HH:mm')} - ${end.format('HH:mm')}`}</span>);
    }
    return (<span>{`${start.format('Do MMM.')} - ${end.format('Do MMM.')}, ${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>);
  }

  render() {
    const {
      value,
      start,
      end,
    } = this.props;
    return (
      <div className="customModal">
        {/* <div className="customModal__text">{this.renderText()}</div> */}
        <div style={{ textAlign: 'center', marginBottom: '5px' }}>
          <input
            defaultValue={start.format('HH:mm')}
            type="time"
            onChange={e => this.setState({ start: e.target.value })}
          />
          <span style={{ margin: '1rem' }}> - </span>
          <input
            defaultValue={end.format('HH:mm')}
            type="time"
            onChange={e => this.setState({ end: e.target.value })}
          />
        </div>
        <input
          ref={(el) => { this.input = el; }}
          className="customModal__input"
          type="text"
          placeholder="Enter something"
          defaultValue={value}
        />
        <button className="customModal__button" onClick={this.handleRemove}>Delete</button>
        <button className="customModal__button customModal__button_float_right" onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
export default Modal;
