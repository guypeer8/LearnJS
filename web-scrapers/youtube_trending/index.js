const request = require('request');
const cheerio = require('cheerio');
const writeFile = require('../utils/utils.js').writeFile;

request.get('https://www.youtube.com/feed/trending', function(err,rsp,body) {
	if(err || !body)
		return console.log('error');
	let $ = cheerio.load(body);
	let posts = [];
	$('.expanded-shelf-content-item').each(function(index,el) {
		var data = {};
		var $anchor = $(this).find('.yt-lockup-thumbnail.contains-addto > a');
		data['link'] = 'https://www.youtube.com' + $anchor.attr('href');
		data['image'] = $anchor.find('img').attr('src');
		data['duration'] = $anchor.find('.video-time').text();
		var $content = $(this).find('.yt-lockup-content');
		data['title'] = $content.find('.yt-lockup-title > a').text();
		posts.push(data);
	});
	
	writeFile('youtube_trending',posts);
});