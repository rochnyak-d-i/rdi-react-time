import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';

class Time extends PureComponent {
  constructor(props) {
    super(props);

    this._isMount = false;
    this.state = this.__getFormated();
  }

  static propTypes = {
    className: PropTypes.string,
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    format: PropTypes.string,
    autoUpdate: PropTypes.bool,
    timeUpdate: PropTypes.number,
    calendarUntilDays: PropTypes.number
  }

  static defaultProps = {
    format: DATETIME_FORMAT,
    timeUpdate: 5 * 1000
  }

  componentDidMount() {
    this._isMount = true;

    if (this.props.autoUpdate) {
      this.runUpdater();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.date !== this.props.date ||
      prevProps.format !== this.props.format
    ) {
      this.setState(this.__getFormated());
    }
  }

  componentWillUnmount() {
    this._isMount = false;
    clearTimeout(this.__timeout);
  }

  runUpdater() {
    this.__timeout = setTimeout(() => {
      if (!this._isMount) {
        return;
      }

      this.setState(this.__getFormated());

      this.runUpdater();
    }, this.props.timeUpdate);
  }

  __getFormated() {
    const {date, format, autoUpdate, calendarUntilDays} = this.props;
    const mDate = moment(date);

    let visibleFormat;

    if (autoUpdate) {
      visibleFormat = mDate.fromNow();
    }
    else {
      if (calendarUntilDays) {
        const untilDays = mDate.diff(Date.now(), 'days');

        if (untilDays < 1 && Math.abs(untilDays) <= calendarUntilDays) {
          visibleFormat = mDate.calendar();
        }
      }

      if (!visibleFormat) {
        visibleFormat = mDate.format(format);
      }
    }

    return {
      attr: mDate.format(DATETIME_FORMAT),
      visible: visibleFormat
    }
  }

  render() {
    return (
      <time
        suppressHydrationWarning={true}
        className={this.props.className}
        dateTime={this.state.attr}
      >{this.state.visible}</time>
    );
  }
}

export default Time;
