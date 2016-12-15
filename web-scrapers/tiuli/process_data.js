const fs = require('fs');
const { writeFile } = require('../utils/utils.js');
const stars = process.argv[2] || 9;

const posts = JSON.parse(fs.readFileSync('./jsons/recommended_trips_israel.json', 'utf-8'));
let highRated = [];

posts.forEach(post => {
	if(post['stars'] > stars) {
		highRated.push(post);
	}
});

writeFile('high_rated', highRated);