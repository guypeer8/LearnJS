const TheMarker = require('./crawlers.js');
const category = process.argv[2];

if(category === 'all') {
	[
		'main', 
		'news', 
		'tech', 
		'cars', 
		'business', 
		'realestate', 
		'finance', 
		'markets'
	].forEach(category => TheMarker.scrape(category));
}
else {
	TheMarker.scrape(category || 'main');
}

/**
	Usage: run this file. call "TheMarker.scrape('news')"" if you want to scrap the news page. you have other options commented above.
	       you may also pass category via the command line for example 'node index.js news'.
 */