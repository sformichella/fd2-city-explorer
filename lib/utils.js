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


module.exports = {
  mungeLocation,
  mungeWeather
};
