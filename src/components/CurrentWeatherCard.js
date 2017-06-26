import React from 'react';
import PropTypes from 'prop-types';

import getTempSign from '../utility/getTempSign';
import getWeekDay from '../utility/getWeekDay';

export default function CurrentWeatherCard({ weatherData }) {
  function formatDate(date) {
    const match = date.match(/(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{1,2})/);
    const formatedDate = `${match[3]}.${match[2]}.${match[1]} ${match[4]}:${match[5]}`;

    return formatedDate;
  }

  const {
    current: { condition: { text: conditionText, icon }, pressure_mb: pressure,
    temp_c: temp, wind_dir: windDir, wind_kph: windSpeed, humidity },
    location: { name, localtime, region },
  } = weatherData;
  const date = formatDate(localtime);
  const weekDay = getWeekDay(new Date(Date.parse(localtime)).getDay());

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 thumbnail text-center">
      <h1 style={{ margin: '20px 0' }}>
        <span>{ name }</span>
        <br />
        <small> { region }</small>
      </h1>
      <p style={{ fontSize: '18px' }}>
        { weekDay }
        <br />
        <small>{ date }</small>
      </p>
      <p style={{ fontSize: '40px', marginBottom: '0' }}>
        { `${getTempSign(temp)}${temp} °C` }
      </p>
      <img src={icon} alt="Weather icon" />
      <p style={{ fontSize: '20px', marginBottom: '40px' }}>
        { conditionText }
      </p>
      <div style={{ fontSize: '20px' }} className="col-md-12">
        <div className="col-xs-12 col-sm-4 col-md-4">
          <p>Wind: { `${windSpeed}mph ${windDir}` }</p>
        </div>
        <div className="col-xs-12 col-sm-4 col-md-4">
          <p>Pressure: { pressure.toFixed(0) } Millibars</p>
        </div>
        <div className="col-xs-12 col-sm-4 col-md-4">
          <p>Humidity: { humidity }%</p>
        </div>
      </div>
    </div>
  );
}

CurrentWeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    current: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }).isRequired,
};
