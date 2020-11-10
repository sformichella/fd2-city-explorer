require('dotenv').config();

const fakeRequest = require('supertest');
const app = require('../lib/app');

const { 
  mungeLocation,
  mungeWeather,
  mungeHike,
  mungeReview
} = require('../lib/utils.js');

const locationTestData = require('../data/locationTestData.js');

describe('app routes', () => {
  describe('routes', () => {

    test('returns munged location data', async() => {
      const expectation = {
        formatted_query: 'Portland, Multnomah County, Oregon, USA',
        latitude: '45.5202471',
        longitude: '-122.6741949'
      };

      const actual = mungeLocation(locationTestData);

      expect(actual).toEqual(expectation);
    });

  });
});
