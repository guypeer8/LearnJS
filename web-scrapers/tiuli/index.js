const Tiuli = require('./crawlers.js');
const NUMBER_OF_PAGES = process.argv[2] || 20;

Tiuli.scrape(NUMBER_OF_PAGES);