const request = require('request');
const async = require('async');
const cheerio = require('cheerio');
const { writeFile } = require('../utils/utils.js');
const BASE_URL = 'http://www.tiuli.com/';
const SEARCH_URL = `${BASE_URL}track_search.asp?page=`;

const km = 'אורך בק"מ:';
const diff = 'רמת קושי:';
const seas = 'עונות:';

Array.prototype.extend = function(arr) {
	arr.forEach(item => this.push(item));
}

module.exports = {
	scrape(NUMBER_OF_PAGES) {
		// create async functions array
		let asyncParallelFunctions = [];
		for(let page = 0; page <= NUMBER_OF_PAGES; page++) {
			asyncParallelFunctions.push(generateAsyncScraper(page));
		}
		// async parallel
		async.parallel(asyncParallelFunctions, (err, results) => {
			if(err)
				return console.log('Action failed');
			const posts = [];
			results.forEach(result => posts.extend(result));
			writeFile('recommended_trips_israel', posts);
		});
	}
}

function generateAsyncScraper(page) {
	return function asyncScrape(callback) {
		const URL = `${SEARCH_URL}${page}`;
		request.get(URL, (err, rsp, body) => {
			if(err)
				return callback(err);
			console.log(`scraping page number: ${page}`);
			const $ = cheerio.load(body);
			callback(null, getPageData($));
		});
	}
}

function getPageData($) {
	const $list = $('.search_page_result_item');
	const posts = [];
	$list.each(function(index, el) {
		const data = { details: [] };
		const $img = $(this).find('.search_page_result_image');
		data['link'] = BASE_URL + $img.find('a').attr('href');
		data['image'] = BASE_URL + $img.find('img').attr('src');
		const $title = $(this).find('.search_page_results_title');
		data['title'] = $title.find('a').text();
		data['stars'] = Number($title.find('ul .icon_color_orange').text());
		data['summary'] = $(this).find('.search_page_results_summary').text().trim();
		const $details = $(this).find('#search_result_details').children();
		data['area'] = $details.eq(0).text().replace('אזור:','').trim();
		const details_text = $details.eq(1).text().trim(); 
		const diffIndex = details_text.indexOf(diff);
		const seasIndex = details_text.indexOf(seas);
		const kmIndex = details_text.indexOf(km);
		data['seasons'] = details_text.substring(seasIndex + seas.length, diffIndex).trim();
		data['difficulty'] = details_text.substring(diffIndex + diff.length, kmIndex).trim();
		data['killometers'] = Number(details_text.substring(kmIndex + km.length).trim());
		$details.last().find('img').each(function() {
			data['details'].push($(this).attr('title'))
		});
		posts.push(data);
	});
	return posts;
}