export function closePopup(popupName) {
  return {
    type: 'CLOSE_POPUP',
    popupName,
  };
}

export function fetchCurrentWeather(query) {
  return {
    type: 'FETCH_CURRENT_WEATHER',
    query,
  };
}

export function fetchFiveDayWeather(query) {
  return {
    type: 'FETCH_FIVE_DAY_WEATHER',
    query,
  };
}

export function showPopup(popupName) {
  return {
    type: 'SHOW_POPUP',
    popupName,
  };
}
