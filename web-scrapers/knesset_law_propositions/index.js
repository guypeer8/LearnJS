

const KnessetLaws = require('./collectors.js');
let FROM_PAGE = Number(process.argv[2]);
let NUMBER_OF_PAGES = Number(process.argv[3]);
if(!FROM_PAGE || !NUMBER_OF_PAGES || isNaN(FROM_PAGE) || isNaN(NUMBER_OF_PAGES)) {
	FROM_PAGE = 1;
	NUMBER_OF_PAGES = 200;
}

KnessetLaws.scrape(FROM_PAGE, NUMBER_OF_PAGES);

/**
	Usage: run this file. pass number of pages to crawl and page to crawl from via the command line for example 'node index.js 15 60'.
 */