import React from 'react';
import PropTypes from 'prop-types';

import getTempSign from '../utility/getTempSign';
import getWeekDay from '../utility/getWeekDay';

export default function WeatherCard({
  weatherData: { date, day: { condition, totalprecip_mm: precip }, hour },
}) {
  function formatDate(dateStr) {
    const match = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
    const formatedDate = `${match[3]}.${match[2]}.${match[1]}`;

    return formatedDate;
  }

  const formatedDate = formatDate(date);
  const weekDay = getWeekDay(new Date(Date.parse(date)).getDay());
  const tempDay = hour[12].temp_c;
  const tempNight = hour[3].temp_c;

  return (
    <div style={{ flexGrow: '1', padding: '20px 0' }} className="thumbnail text-center">
      <h4>
        { weekDay }
        <br />
        <small>{ formatedDate }</small>
      </h4>
      <img src={condition.icon} alt="Weather icon" />
      <p>{ condition.text }</p>
      <p>Day: <strong>{ `${getTempSign(tempDay)}${tempDay} °C` }</strong></p>
      <p>Night: <strong>{ `${getTempSign(tempNight)}${tempNight} °C` }</strong></p>
      <p>Precip.: <strong>{ precip } mm</strong></p>
    </div>
  );
}

WeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    city: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired,
  }).isRequired,
};
