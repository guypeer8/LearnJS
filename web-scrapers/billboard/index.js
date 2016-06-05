const Billboard = require('./collectors');
let board = process.argv[2];

Billboard.scrape(board || null); // hot-100, billboard-200, rock, mainstram-rock, artist-100

/**
	Usage: run this file. call "Billboard.scrape('hot-100')"" if you want to scrap the hot-100 page. you have other options commented above.
	       you may also pass board via the command line for example 'node index.js artist-100'.
 */