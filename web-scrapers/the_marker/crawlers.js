const request = require('request');
const cheerio = require('cheerio');
const urls = require('./urls.js');
const BASE_URL = urls.BASE_URL;
const writeFile = require('../utils/utils.js').writeFile;

module.exports = {
	scrape(what) {
		console.log('Scanning data...');
		switch(what) {
			case 'main':
				scrapeMain();
				break;	
			case 'news':
				scrapeNews();
				break;
			case 'tech':
				scrapeTech();
				break;
			case 'cars':
				scrapeCars();
				break;
			case 'business':
				scrapeBusiness();
				break;
			case 'realestate':
				scrapeRealestate();
				break;	
			case 'finance':
				scrapeFinance();
				break;	
			case 'markets':
				scrapeMarkets();
				break;	
			default:
				scrapeMain();
				break;			
		}
	}
}

/************
   scrapers
 ************/
function scrapeMain() {
	let posts = [];
	request.get(BASE_URL, function(err,rsp,body) {
		if(err || !body) {
			return console.log('something went wrong');
		}
		let $ = cheerio.load(body);
		$('.card__section').each(function(index,el) {
			console.log('post number: ' + (index + 1));
			var post = {'section':'main'};
			var $a = $(this).find('a').first();
			var $img = $a.find('.h-posr').first().find('img').first();
			var $footer = $(this).find('.t-byline').first();
			var href = $a.attr('href');
			post['url'] = href.indexOf('www.themarker') > -1 ? href : (BASE_URL + href);
			post['image'] = BASE_URL + $img.attr('srcset');
			var title_cls = index == 0 ? 'h1.h-mb--xxtight' : 'h3.h-mb--xxtight';
			post['title'] = $a.find(title_cls).first().text().trim();
			post['sub_title'] = $a.find('p.h-mb--xxtight').first().text().trim();
			post['time'] = $footer.find('time').attr('datetime');
			post['comments'] = Number($footer.find('span.c-brand').text());
			posts.push(post);
		});
		writeFile('themarker_main', posts);
	});
}

function scrapeNews() {
	categoryCrawler(urls.NEWS,'news');
}

function scrapeTech() {
	categoryCrawler(urls.TECH,'tech');
}

function scrapeCars() {
	categoryCrawler(urls.CARS,'cars');
}

function scrapeBusiness() {
	categoryCrawler(urls.BUSINESS,'business');
}

function scrapeRealestate() {
	categoryCrawler(urls.REALESTATE,'realestate');
}

function scrapeFinance() {
	categoryCrawler(urls.FINANCE,'finance');
}

function scrapeMarkets() {
	categoryCrawler(urls.MARKETS,'markets');
}
/*****************
   Site Crawler
 ****************/
function categoryCrawler(url, subject) {
	var posts = [];
	request.get(url, function(err,rsp,body) {
		if(err || !body) {
			return console.log('something went wrong');
		}
		var $ = cheerio.load(body); 
		var mainPost = {'section':subject};	
		var $mainPost = $('.l-main').first().find('article').first();
 		console.log('main post');
 		var $a = $mainPost.find('a').first();
 		var $content = $mainPost.find('header').first();
 		var $footer = $mainPost.find('.t-byline').first();
 		var href = $a.attr('href');
 		mainPost['url'] = href.indexOf('www.themarker') > -1 ? href : (BASE_URL + href);
 		mainPost['image'] = BASE_URL + $a.find('img').first().attr('srcset');
 		mainPost['title'] = $content.find('h1').text().trim();
 		mainPost['sub_title'] = $content.find('p').text().trim();
  		mainPost['time'] = $footer.find('time').attr('datetime');
 		mainPost['comments'] = Number($footer.find('span.c-brand').text());		
 		posts.push(mainPost);			
	 	$('article.h-mb').not('[data-back]').each(function(index,el) {
	 		console.log('post number: ' + (index + 1));
	 		var post = {'section':subject};
	 		var $a = $(this).find('a.media').first();
	 		var $content = $(this).find('.media__content').first();
	 		var $footer = $(this).find('.t-byline').first();
	 		var href = $a.attr('href');
	 		post['url'] = href.indexOf('www.themarker') > -1 ? href : (BASE_URL + href);
	 		post['image'] = BASE_URL + $a.find('img').first().attr('srcset');
	 		post['title'] = $content.find('h3').text().trim();
	 		post['sub_title'] = $content.find('p').text().trim();
	  		post['time'] = $footer.find('time').attr('datetime');
	 		post['comments'] = Number($footer.find('span.c-brand').text());		
	 		posts.push(post);
	 	});
	 	writeFile('themarker_' + subject, posts);	
	 });
}
