

var request = require('request');
var cheerio = require('cheerio');
var writeFile = require('../utils/utils.js').writeFile;
var BASE_URL = 'http://www.tiuli.com/';
var SEARCH_URL = BASE_URL + 'track_search.asp?page=';

Array.prototype.extend = function(arr) {
	arr.forEach(function(item) {
		this.push(item);
	}.bind(this));
}

module.exports = {
	scrape: function(NUMBER_OF_PAGES) {
		iteratePages(1,NUMBER_OF_PAGES,[]);
	}
}

function iteratePages(i,NUMBER_OF_PAGES,posts) {
	if(i > NUMBER_OF_PAGES) {
		return writeFile('recommended_trips_israel',posts);
	}
	request.get(SEARCH_URL + i, function(err,rsp,body) {
		if(err)
			return iteratePages(i,NUMBER_OF_PAGES);
		console.log('scraping page number: ' + i);
		var $ = cheerio.load(body);
		posts.extend(getPageData($));
		i++;
		iteratePages(i,NUMBER_OF_PAGES,posts);
	});
}

function getPageData($) {
	var km = 'אורך בק"מ:';
	var diff = 'רמת קושי:';
	var seas = 'עונות:';
	var posts = [];
	var $list = $('.search_page_result_item');
	$list.each(function(index,el) {
		var data = {};
		var $img = $(this).find('.search_page_result_image');
		data['link'] = BASE_URL + $img.find('a').attr('href');
		data['image'] = BASE_URL + $img.find('img').attr('src');
		var $title = $(this).find('.search_page_results_title');
		data['title'] = $title.find('a').text();
		data['stars'] = Number($title.find('ul .icon_color_orange').text());
		data['summary'] = $(this).find('.search_page_results_summary').text().trim();
		var $details = $(this).find('#search_result_details').children();
		data['area'] = $details.eq(0).text().replace('אזור:','').trim();
		var details_text = $details.eq(1).text().trim(); 
		var diffIndex = details_text.indexOf(diff);
		var seasIndex = details_text.indexOf(seas);
		var kmIndex = details_text.indexOf(km);
		data['seasons'] = details_text.substring(seasIndex + seas.length, diffIndex).trim();
		data['difficulty'] = details_text.substring(diffIndex + diff.length, kmIndex).trim();
		data['killometers'] = Number(details_text.substring(kmIndex + km.length).trim());
		data['details'] = [];
		$details.last().find('img').each(function(i,img) {
			data['details'].push($(this).attr('title'));
		});
		posts.push(data);
	});
	return posts;
}