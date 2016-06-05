

var fs = require('fs');
var writeFile = require('../utils/utils.js').writeFile;
var stars = process.argv[2] || 9;

var posts = JSON.parse(fs.readFileSync('./jsons/recommended_trips_israel.json', 'utf-8'));
var highRated = [];

posts.forEach(function(p) {
	if(p['stars'] > stars) {
		highRated.push(p);
	}
});

writeFile('high_rated', highRated);