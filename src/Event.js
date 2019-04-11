import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  value: PropTypes.string,
  scaleUnit: PropTypes.number.isRequired,
};

class Event extends React.PureComponent {
  render() {
    const {
      start,
      end,
      value,
      scaleUnit,
    } = this.props;
    return (
      <div className="event">
        {
          end - start > (scaleUnit * 60 * 1000)
            ? (
              <Fragment>
                <div className="event__time">
                  {start.format('HH:mm')}
                </div>
                <div className="event__text">
                  {value || ''}
                </div>
                <div className="event__time">
                  {end.format('HH:mm')}
                </div>
              </Fragment>
            ) : (
              <div className="event__time">
                {`${start.format('HH:mm')} - ${end.format('HH:mm')}`}
              </div>
            )
        }
      </div>
    );
  }
}

Event.propTypes = propTypes;
export default Event;
