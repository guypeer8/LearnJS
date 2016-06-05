const TheMarker = require('./crawlers.js');
let category = process.argv[2];

TheMarker.scrape(category || 'main'); // main, news, tech, cars, business, realestate, finance, markets

/**
	Usage: run this file. call "TheMarker.scrape('news')"" if you want to scrap the news page. you have other options commented above.
	       you may also pass category via the command line for example 'node index.js news'.
 */