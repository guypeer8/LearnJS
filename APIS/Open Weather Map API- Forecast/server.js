const express = require('express');
const request = require('request');
const path = require('path');
const utils = require('./utils');
const conf = require('./conf');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '/public')));

// Get weather forecast route
app.get('/get-weather-forecast', function(req,res) {
	let body = utils.parseUrlQuery(req.url);
	let { mode, city } = body;
	city = utils.ensureUpperLower(city);
	let url = conf.WEATHER_URL + "q=" + city + "," + utils.countryCode[city] + "&mode=json&APPID=" + conf.API_KEY;

	request.get(url, (err, response, body) => {
		if(err)
			return res.end({ status: 'error' });
		res.json(body);
	});
});

// Listen on port 8000
app.listen(8000, function(err) {
	if(err)
		return new Error('Could not connect to server');
	console.log('Listening on 8000');
});
