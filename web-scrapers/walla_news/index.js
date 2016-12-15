const request = require('request');
const cheerio = require('cheerio');
const { writeFile } = require('../utils/utils.js');


request.get('http://www.walla.co.il/', (err,rsp,body) => {
	if(err || !body)
		return console.log('error');
	const $ = cheerio.load(body);
	const posts = [];
	$('.article').each(function(index,el) {
		const data = {};
		$children = $(this).children();
		const $anchor = $children.first();
		const href = $anchor.attr('href');
		if(href) {
			data['url'] = href;
		}
		const $title = $anchor.find('.title');
		if($title) {
			data['title'] = $title.text();
		}
		const $figure = $anchor.find('.figure');
		const $pre_title = $anchor.find('.pre-title');
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