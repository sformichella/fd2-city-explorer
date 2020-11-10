function handleError() {
  return {
    status: 500,
    responseText: 'Sorry, something went wrong.'
  };
}

function mungeLocation(location) {
  return {
    formatted_query: location.display_name,
    latitude: location.lat,
    longitude: location.lon
  };
}

function mungeWeather(weather) {
  const trimmedData = weather.filter(day => weather.indexOf(day) < 8);

  return trimmedData.map(day => {
    return {
      forecast: day.weather.description,
      time: day.datetime
    };
  });
}

function mungeHike(trails) {
  const trimmedData = trails.filter(hike => trails.indexOf(hike) < 10);

  return trimmedData.map(hike => {
    return {
      name: hike.name,
      location: hike.location,
      length: hike.length,
      stars: hike.stars,
      star_votes: hike.starVotes,
      summary: hike.summary,
      trail_url: hike.url,
      conidtions: hike.conditionsDetails,
      conditions_date: hike.conditionsDate.slice(0, 10),
      conditions_time: hike.conditionsDate.slice(11)
    };
  });
}


module.exports = {
  handleError,
  mungeLocation,
  mungeWeather,
  mungeHike,
};
