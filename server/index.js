const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const dotenv = require('dotenv').config()
const app = express();
var axios = require("axios").default;

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {

/*
TODO 
Slider for start and end years
Slider for startratings and endrating
Genre checkboxes
Audio options/subtitle options?

Rooms for sessions to hold options and response data
push liked ID's to an object on the room

*/
  var options = {
    method: 'GET',
    url: 'https://unogsng.p.rapidapi.com/search',
    params: {
      start_year: '1990',
      orderby: 'rating',
      limit: '100',
      countrylist: '78,46',
      audio: 'english',
      offset: '0',
      end_year: '2021',
      genrelist: '11714',
      type: 'movie'
    },
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  
 
  res.json({ message: "Hello from the backend!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
