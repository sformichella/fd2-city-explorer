const locationTestData = {
  'place_id':'282983082',
  'licence':'https://locationiq.com/attribution',
  'osm_type':'relation',
  'osm_id':'186579',
  'boundingbox':['45.432536', '45.6528812', '-122.8367489', '-122.4720252'],
  'lat':'45.5202471',
  'lon':'-122.6741949',
  'display_name':'Portland, Multnomah County, Oregon, USA',
  'class':'place', 'type':'city',
  'importance':0.753565717433768,
  'icon':'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
};

const expectedLocationData = {
  formatted_query: 'Portland, Multnomah County, Oregon, USA',
  latitude: '45.5202471',
  longitude: '-122.6741949'
};

module.exports = {
  locationTestData,
  expectedLocationData
};
