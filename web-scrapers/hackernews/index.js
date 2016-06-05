const HackerNews = require('./collector.js');
let HOW_MANY_PAGES = Number(process.argv[2]);
if(!HOW_MANY_PAGES || isNaN(HOW_MANY_PAGES)) {
	HOW_MANY_PAGES = 20;
}
HOW_MANY_PAGES = Math.min(HOW_MANY_PAGES,25);

HackerNews.scrape(HOW_MANY_PAGES);

/**
	Usage: run this file. pass number of pages to crawl via the command line for example 'node index.js 15'.
 */