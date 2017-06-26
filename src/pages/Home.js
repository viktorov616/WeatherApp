import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import PeriodControls from '../components/PeriodControls';
import Popup from '../components/Popup';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';

export default class Home extends Component {
  constructor(props) {
    super(props);

    const { closePopup } = this.props;

    this.getWeatherData = this.getWeatherData.bind(this);
    this.closeFetchErrorPopup = closePopup.bind(null, 'fetchError');
  }

  componentWillMount() {
    const { currentQuery } = this.props.home;

    if ((currentQuery === '') && ('geolocation' in navigator)) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => (
        this.getWeatherData({ query: `${latitude},${longitude}` })
      ));
    }
  }

  getWeatherData({ query, type = this.props.location.pathname }) {
    const { fetchCurrentWeather, fetchFiveDayWeather } = this.props;

    if (type === '/' || type === '/current' || type === 'current') {
      fetchCurrentWeather(query);
    } else if (type === '/5-day' || type === 'fiveDay') {
      fetchFiveDayWeather(query);
    }
  }

  render() {
    const {
      home: {
        currentQuery, currentWeatherData, displayFetchError, fetchErrorText, fiveDayWeatherData,
        isFetching,
      },
    } = this.props;
    const fetchErrorPopup = (displayFetchError)
      ? (<Popup
        close={this.closeFetchErrorPopup}
        header="Error"
        headerClass="text-danger"
        ok={this.closeFetchErrorPopup}
        text={fetchErrorText}
      />)
      : null;

    return (
      <div>
        <div className="col-xs-12 col-sm-12 col-md-12" style={{ margin: '30px 0' }}>
          <div className="col-xs-12 col-sm-8 col-md-9">
            <SearchBar
              onSubmit={this.getWeatherData}
              isFetching={isFetching}
            />
          </div>
          <div style={{ float: 'right' }} className="col-xs-12 col-sm-4 col-md-3">
            <PeriodControls />
          </div>
        </div>
        <div style={{ padding: '0 30px' }} className="col-xs-12 col-sm-12 col-md-12">
          <Route
            exact
            path="/:type?"
            render={({ match }) => {
              const { params: { type } } = match;
              let forecastType;

              if (type === '5-day') {
                forecastType = 'fiveDay';
              } else {
                forecastType = 'current';
              }

              return (<WeatherDisplay
                currentQuery={currentQuery}
                currentWeatherData={currentWeatherData}
                fiveDayWeatherData={fiveDayWeatherData}
                forecastType={forecastType}
                getWeatherData={this.getWeatherData}
              />);
            }}
          />
        </div>
        <ReactCSSTransitionGroup
          transitionName="animation-fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          { fetchErrorPopup }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Home.propTypes = {
  closePopup: PropTypes.func.isRequired,
  fetchCurrentWeather: PropTypes.func.isRequired,
  fetchFiveDayWeather: PropTypes.func.isRequired,
  home: PropTypes.shape({
    currentQuery: PropTypes.string.isRequired,
    currentWeatherData: PropTypes.object.isRequired,
    displayFetchError: PropTypes.bool.isRequired,
    fetchErrorText: PropTypes.string.isRequired,
    fiveDayWeatherData: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
