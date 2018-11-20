'use strict';

// Load Express
const express = require('express');
const cors = require('cors');

// Load Environment Variables from the .env file
require('dotenv').config();

// Instantiate Express so that we can use it
const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/location', function(req, res){
  console.log(req.query.data, "is the query that came from search field in browser");
  const locationData = searchToLatLong(req.query.data);
  console.log(locationData);
  res.send(locationData)
})

function searchToLatLong(query){
  const getData = require('./data/geo.json');
  console.log(getData);
  const location = new Location(getData.results[0]);
  console.log(location);
  location.search_query = query;
  return location;
}

function Location(data){
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

// Define which directory that we will serve files from
// app.use(express.static('./public'));

// Tell the app to listen so that it can do its thing
app.listen(PORT, () => console.log(`Our app is listening on port ${PORT}`));