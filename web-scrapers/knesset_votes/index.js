const KnessetVotes = require('./collectors.js');
let FROM_PAGE = Number(process.argv[2]);
let NUMBER_OF_PAGES = Number(process.argv[3]);
if(!FROM_PAGE || !NUMBER_OF_PAGES || isNaN(FROM_PAGE) || isNaN(NUMBER_OF_PAGES)) {
	FROM_PAGE = 1;
	NUMBER_OF_PAGES = 200;
}

KnessetVotes.scrape(FROM_PAGE, NUMBER_OF_PAGES);