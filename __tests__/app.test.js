require('dotenv').config();

const fakeRequest = require('supertest');
const app = require('../lib/app');

const { 
  mungeLocation,
  mungeWeather,
  mungeHike,
  mungeReview
} = require('../lib/utils.js');

const { locationTestData, expectedLocationData } = require('../data/locationTestData.js');
const { weatherTestData, expectedWeatherData } = require('../data/weatherTestData.js');
const { trailsTestData, expectedTrailsData } = require('../data/trailsTestData.js');
const { reviewsTestData, expectedReviewsData } = require('../data/reviewsTestData.js');

describe('app routes', () => {
  describe('routes', () => {

    test('returns munged location data', async() => {
      const expectation = expectedLocationData;

      const actual = mungeLocation(locationTestData);

      expect(actual).toEqual(expectation);
    });

    test('returns munged weather data', async() => {
      const expectation = expectedWeatherData;

      const actual = mungeWeather(weatherTestData);

      expect(actual).toEqual(expectation);
    });

    test('returns munged trails data', async() => {
      const expectation = expectedTrailsData;

      const actual = mungeHike(trailsTestData);

      expect(actual).toEqual(expectation);
    });

    test('returns munged reviews data', async() => {
      const expectation = expectedReviewsData;

      const actual = mungeReview(reviewsTestData);

      expect(actual).toEqual(expectation);
    });

  });
});
