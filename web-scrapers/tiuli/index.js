

var Tiuli = require('./crawlers.js');
var NUMBER_OF_PAGES = process.argv[2] || 20;

Tiuli.scrape(NUMBER_OF_PAGES);