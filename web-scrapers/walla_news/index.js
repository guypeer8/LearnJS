

const request = require('request');
const cheerio = require('cheerio');
const writeFile = require('../utils/utils.js').writeFile;


request.get('http://www.walla.co.il/', function(err,rsp,body) {
	if(err || !body)
		return console.log('error');
	let $ = cheerio.load(body);
	let posts = [];
	$('.article').each(function(index,el) {
		var data = {};
		$children = $(this).children();
		var $anchor = $children.first();
		var href = $anchor.attr('href');
		if(href) {
			data['url'] = href;
		}
		var $title = $anchor.find('.title');
		if($title) {
			data['title'] = $title.text();
		}
		var $figure = $anchor.find('.figure');
		var $pre_title = $anchor.find('.pre-title');
		if($figure.length !== 0) {
			data['image'] = $figure.find('img').attr('src');
		}
		if($pre_title.length !== 0) {
			data['pre_title'] = $pre_title.text();
		}

		if(Object.keys(data).length > 0) {
			posts.push(data);
		}
	});
	
	writeFile('walla_news',posts);
});