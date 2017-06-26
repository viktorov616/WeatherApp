import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CurrentWeatherCard from './CurrentWeatherCard';
import WeatherCard from './WeatherCard';

export default class WeatherDisplay extends Component {
  componentWillUpdate(nextProps) {
    const { forecastType, getWeatherData } = this.props;

    if ((forecastType !== nextProps.forecastType) && (nextProps.currentQuery !== '')) {
      getWeatherData({ query: nextProps.currentQuery, type: nextProps.forecastType });
    }
  }

  render() {
    const { currentWeatherData, fiveDayWeatherData, forecastType } = this.props;
    let content = null;

    if (forecastType === 'current') {
      content = (Object.keys(currentWeatherData).length)
        ? <CurrentWeatherCard weatherData={currentWeatherData} />
        : null;
    } else if (forecastType === 'fiveDay') {
      content = (Object.keys(fiveDayWeatherData).length)
        ? (<div>
          <h1 style={{ margin: '20px 25px', marginBottom: '25px' }}>
            { fiveDayWeatherData.location.name }
            <br />
            <small> { fiveDayWeatherData.location.region }</small>
          </h1>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            { fiveDayWeatherData.forecast.forecastday.map(item => (
              <div
                key={item.date_epoch}
                className="weather-display__card"
              >
                <WeatherCard weatherData={item} />
              </div>
            )) }
          </div>
        </div>)
        : null;
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

WeatherDisplay.propTypes = {
  currentQuery: PropTypes.string.isRequired,
  currentWeatherData: PropTypes.object.isRequired,
  fiveDayWeatherData: PropTypes.object.isRequired,
  forecastType: PropTypes.string.isRequired,
  getWeatherData: PropTypes.func.isRequired,
};
