const request = require('request');
const cheerio = require('cheerio');
const { writeFile } = require('../utils/utils.js');

const URL = 'https://oknesset.org/vote/';
const FAILS_BOUNDRY = 50; // when to abort scanning
let number_of_fails = 0; // count number of errors while scanning
let posts = [];

module.exports = {

	scrape(FROM_PAGE, NUMBER_OF_PAGES) {
		request.get(URL, function(err,rsp,body) {
			if(err || !body)
				return console.log('error on getting number of pages');	
			var $ = cheerio.load(body);

			var NUMBER_OF_EXISTING_PAGES = Number($('.pagination li').last().text()); // Existing pages on site 

			if(FROM_PAGE > NUMBER_OF_EXISTING_PAGES) {
				return console.log('There are no more than ' + NUMBER_OF_EXISTING_PAGES + ' pages');
			}

			var boundry = FROM_PAGE + NUMBER_OF_PAGES - 1; // Number that signifies when the scan should stop
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
/* 1- process votes when data exists */
function processVotes(posts) {
	var number_of_posts = posts.length;		
	var processed = {
		avg_pro:0,
		avg_against:0,
		avg_absteiners:0,
		pro_posts:0,
		against_posts:0,
		absteiner_posts:0,
		number_of_posts:number_of_posts
	};

	posts.forEach(function(post) {
		if(post.voted_pro > post.voted_against && post.voted_pro > post.absteiners) {
			processed.pro_posts++;
		}
		else if(post.voted_against > post.voted_pro && post.voted_against > post.absteiners) {
			processed.against_posts++;
		}
		else if(post.absteiners > post.voted_against && post.absteiners > post.voted_pro) {
			processed.absteiner_posts++;
		}
		processed.avg_pro += post.voted_pro;
		processed.avg_against += post.voted_against;
		processed.avg_absteiners += post.absteiners;
	});

	['avg_pro','avg_against','avg_absteiners'].forEach(function(key) {
		processed[key] = Number((processed[key] / number_of_posts).toFixed(2));
	});

	if(!processed['avg_absteiners']) {
		processed['avg_absteiners'] = 0;
	}

	writeFile('open_knesset_law_votes_processed', processed);		
}
/* 2- crawl site */
function crawlKnessetVotes($,posts) {
	$('.card.card-list li').each(function(index,el) {
		var data = {};
		$actions = $(this).find('.item-action').children();
		data['voted_pro'] = Number($actions.first().text());
		data['voted_against'] = Number($actions.eq(1).text());
		data['absteiners'] = Number($actions.last().text());
		data['when'] = $(this).find('.item-context').first().text();
		var $anchor = $(this).find('.item-title a');
		data['link'] = URL + $anchor.attr('href').replace(/\/vote\//,'');
		data['title'] = $anchor.text();
		posts.push(data);
	});
}
/* 3- iterate pages */
function smartIteretor(page,boundry) {
	if(page > boundry) {
		processVotes(posts);
		return writeFile('open_knesset_law_votes',posts);
	}		
	request.get(URL + '?&page=' + page, function(err,rsp,body) {
		if(err || !body) {
			number_of_fails++;
			if(number_of_fails > FAILS_BOUNDRY)
				return console.log('An error keeps occuring, stoping the scan...');
			return smartIteretor(page,boundry);
		}

		console.log('Scanning page number ' + page);
		$ = cheerio.load(body);
		crawlKnessetVotes($,posts);
		page++;
		smartIteretor(page,boundry);
	});
}