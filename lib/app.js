const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');

// Mungtions
const { 
  handleError,
  mungeLocation,
  mungeWeather,
  mungeHike,
  mungeReview
} = require('./utils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password

// everything that starts with "/api" below here requires an auth token!

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/blarg', (req, res) => {
  console.log('get works!');

  res.json({blah: 'blah'});
});

app.get('/location', async(req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${req.query.search}&format=json`;

    const response = await request.get(URL);

    const mungeResponse = mungeLocation(response.body[0]);

    res.json(mungeResponse);

  } catch(e) {
    res.json({ error: e.message });
    res.status(500);
  }
});

app.get('/weather', async(req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.WEATHER_KEY}`;

    const response = await request.get(URL);

    const mungeRepsonse =  mungeWeather(response.body.data);

    res.json(mungeRepsonse);

  } catch(e) {
    res.json({ error: e.message });
    res.status(500);
  }
});

app.get('/trails', async(req, res) => {
  try {
    const URL = `https://www.hikingproject.com/data/get-trails?lat=${req.query.latitude}&lon=${req.query.longitude}&maxDistance=200&key=${process.env.HIKING_KEY}`;

    const response = await request.get(URL);

    const mungeRepsonse = mungeHike(response.body.trails);

    res.json(mungeRepsonse);

  } catch(e) {
    res.json({ error: e.message });
    res.status(500);
  }
});

app.get('/reviews', async(req, res) => {
  try {
    const URL = `https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`;

    const response = await request.get(URL).set({ 'Authorization': `Bearer ${process.env.YELP_KEY}` });

    const mungeResponse = mungeReview(response.body);

    res.json(mungeResponse);

  } catch(e) {
    res.json({ error: e.message });
    res.status(500);
  }
});

app.use(require('./middleware/error'));

module.exports = app;
