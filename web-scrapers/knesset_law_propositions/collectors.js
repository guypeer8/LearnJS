

const request = require('request');
const cheerio = require('cheerio');
const writeFile = require('../utils/utils.js').writeFile;
const crawlLawInitiators = require('./law_initiators.js').crawlLawInitiators;

const URL = 'https://oknesset.org/bill/';
var posts = [];

module.exports = {

	scrape(FROM_PAGE, NUMBER_OF_PAGES) {
		request.get(URL, function(err,rsp,body) {
			if(err || !body)
				return console.log('error');	
			let $ = cheerio.load(body);

			let NUMBER_OF_EXISTING_PAGES = Number($('.pagination li').last().text()); // Existing pages on site 

			if(FROM_PAGE > NUMBER_OF_EXISTING_PAGES) {
				return console.log('There are no more than ' + NUMBER_OF_EXISTING_PAGES + ' pages');
			}

			let boundry = FROM_PAGE + NUMBER_OF_PAGES - 1; // Number that signifies when the scan should stop
			if(boundry > NUMBER_OF_EXISTING_PAGES) {
				boundry = NUMBER_OF_EXISTING_PAGES;
				console.log('Passed the boundry of existing pages. Scanning ' + (boundry - FROM_PAGE) + ' pages');
			}
			else {
				console.log('There are ' + NUMBER_OF_PAGES + ' pages to scan');
			}

			// Start Crawl Loop
			smartIteretor(FROM_PAGE, boundry);
		});
	}

}

/******************
 Private Functions
 *****************/
 /* 1- iterates over site pages */
function smartIteretor(page, boundry) {
	if(page > boundry) {
		crawlLawInitiators(posts); // creates data about law initiators
		return writeFile('open_knesset_law_propositions',posts);
	}		
	request.get(URL + '?&page=' + page, function(err,rsp,body) {
		if(err || !body)
			return smartIteretor(page, boundry);
		console.log('Scanning page number ' + page);
		$ = cheerio.load(body);
		crawlKnessetLawPropositions($,posts);
		page++;
		smartIteretor(page, boundry);
	});
}
/* 2- crawl law propositions in page */
function crawlKnessetLawPropositions($,posts) {
	$('.card.card-list li').each(function(index,el) {
		var data = {};
		data['type'] = $(this).find('.item-action').text();
		data['when'] = $(this).find('.item-context').text();
		var $anchor = $(this).find('.item-title a');
		data['link'] = URL + $anchor.attr('href').replace(/\/bill\//,'');
		data['title'] = $anchor.text();
		posts.push(data);
	});	
}