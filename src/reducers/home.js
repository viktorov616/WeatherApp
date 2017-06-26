const defaultState = {
  currentWeatherData: {},
  currentQuery: '',
  displayFetchError: false,
  fiveDayWeatherData: {},
  isFetching: false,
  fetchErrorText: '',
};

export default function home(state = defaultState, action) {
  switch (action.type) {
    case 'CLOSE_POPUP':
      if (action.popupName === 'fetchError') {
        return {
          ...state,
          displayFetchError: false,
        };
      }

      return state;
    case 'FETCH_CURRENT_WEATHER':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_CURRENT_WEATHER_SUCCEEDED':
      return {
        ...state,
        currentWeatherData: action.weatherData,
      };
    case 'FETCH_FIVE_DAY_WEATHER':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_FIVE_DAY_WEATHER_SUCCEEDED':
      return {
        ...state,
        fiveDayWeatherData: action.weatherData,
      };
    case 'SHOW_POPUP':
      if (action.popupName === 'fetchError') {
        return {
          ...state,
          displayFetchError: true,
        };
      }

      return state;
    case 'FETCH_WEATHER_FAILED':
      return {
        ...state,
        displayFetchError: true,
        fetchErrorText: action.error.message,
        isFetching: false,
      };
    case 'FETCH_WEATHER_SUCCEEDED': {
      const { lat, lon } = action.weatherData.location;

      return {
        ...state,
        currentQuery: `${lat};${lon}`,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}
