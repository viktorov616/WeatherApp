import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import API_KEY from '../api/apiKey';

function fetchCurrentWeather(query) {
  return fetch(
    `http://api.apixu.com/v1/current.json?key=${API_KEY}&q=${query}`,
    ).then(response => response.json());
}

function* fetchCurrentWeatherAsync({ query }) {
  try {
    const weatherData = yield call(fetchCurrentWeather, query);

    if ('error' in weatherData) {
      throw new Error(weatherData.error.message);
    }

    yield put({ type: 'FETCH_WEATHER_SUCCEEDED', weatherData });
    yield put({ type: 'FETCH_CURRENT_WEATHER_SUCCEEDED', weatherData });
  } catch (error) {
    yield put({ type: 'FETCH_WEATHER_FAILED', error });
  }
}

function* watchFetchCurrentWeather() {
  yield takeEvery('FETCH_CURRENT_WEATHER', fetchCurrentWeatherAsync);
}

function fetchFiveDayWeather(query) {
  return fetch(
    `http://api.apixu.com/v1/forecast.json?key=${API_KEY}&days=5&q=${query}`,
    ).then(response => response.json());
}

function* fetchFiveDayWeatherAsync({ query }) {
  try {
    const weatherData = yield call(fetchFiveDayWeather, query);

    if ('error' in weatherData) {
      throw new Error(weatherData.error.message);
    }

    yield put({ type: 'FETCH_WEATHER_SUCCEEDED', weatherData });
    yield put({ type: 'FETCH_FIVE_DAY_WEATHER_SUCCEEDED', weatherData });
  } catch (error) {
    yield put({ type: 'FETCH_WEATHER_FAILED', error });
  }
}

function* watchFetchFiveDayWeather() {
  yield takeEvery('FETCH_FIVE_DAY_WEATHER', fetchFiveDayWeatherAsync);
}

export default function* rootSaga() {
  yield [
    watchFetchCurrentWeather(),
    watchFetchFiveDayWeather(),
  ];
}
