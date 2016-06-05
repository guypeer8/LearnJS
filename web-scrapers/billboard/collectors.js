const request = require('request');
const cheerio = require('cheerio');
const urls = require('./urls.js');
const writeFile = require('../utils/utils.js').writeFile;

/***********
   Exports
 ***********/
const billboard = module.exports = {

	crawl(url,path,collect_function) {
		request.get(url, function(err,rsp,body) {
			if(err || !body)
				return console.log('error collecting data from ' + url);
			var posts = [];
			var $ = cheerio.load(body);
			collect_function($,posts);
			writeFile(path,posts);
		});	
	},

	getPlaylist(url,path) {
		billboard.crawl(url,path,collectMusic);
	},

	getArtists(url,path) {
		billboard.crawl(url,path,collectTopRatedArtists);
	},

	// Playlists and Artists data scrapers
	Rock() {
		billboard.getPlaylist(urls.ROCK,'billboard_rock_songs');
	},

	MainstreamRock() {
		billboard.getPlaylist(urls.MAINSTREAM_ROCK,'billboard_mainstream_rock');
	},

	Hot_100() {
		billboard.getPlaylist(urls.HOT_100,'billboard_hot_100');
	},

	Billboard_200() {
		billboard.getPlaylist(urls.BILLBOARD_200,'billboard_200');
	},

	Artists_100() {
		billboard.getArtists(urls.ARTISTS_100,'artists_100');
	},

	All() {
		billboard.Rock();
		billboard.MainstreamRock();
		billboard.Hot_100();
		billboard.Billboard_200();
		billboard.Artists_100();			
	},

	scrape(what) {
		if(typeof what == 'string') {
			switch(what.toLowerCase()) {
				case 'artist-100':
					billboard.Artists_100();
					break;
				case 'billboard-200':
					billboard.Billboard_200();
					break;
				case 'hot-100':
					billboard.Hot_100();
					break;	
				case 'mainstream-rock':
					billboard.MainstreamRock();
					break;
				case 'rock':
					billboard.Rock();
					break;
				default:
					billboard.All();	
					break;						
			}
		}
		else {
			billboard.All();
		}
	}

}

/*******************
  Private Functions
 *******************/
/* 1 */
function collectMusic($,posts) {
	$('.chart-row__primary').each(function(index,el) {
		var data = {};
		data['rank'] = Number($(this).find('.chart-row__rank .chart-row__current-week').text());

		var $img = $(this).find('.chart-row__image');
		var bgImg = $img.css('background-image');
		if(bgImg)
			data['image'] = bgImg.replace('url(','').replace(')','');
		else
			data['image'] = $img.attr('data-imagesrc');
		var $music = $(this).find('.chart-row__title');
		data['song'] = $music.find('.chart-row__song').text();
		data['artist'] = $music.find('.chart-row__artist').text();
		posts.push(data);
	});	
}
/* 2 */
function collectTopRatedArtists($,posts) {
	$('.chart-row__primary').each(function(index,el) {
		var data = {};
		data['rank'] = Number($(this).find('.chart-row__rank .chart-row__current-week').text());

		var $img = $(this).find('.chart-row__image');
		var bgImg = $img.css('background-image');
		if(bgImg)
			data['image'] = bgImg.replace('url(','').replace(')','');
		else
			data['image'] = $img.attr('data-imagesrc');
		data['artist'] = $(this).find('.chart-row__title').text();
		posts.push(data);
	});	
}