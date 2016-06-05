const request = require('request');
const cheerio = require('cheerio');
const writeFile = require('../utils/utils.js').writeFile;

const URL = 'https://news.ycombinator.com/news?p=';
let posts = [];
let $;

/***********
   Exports
 ***********/
module.exports = {

	scrape(PAGES_TO_SCAN) {
		console.log('Start Scanning ' + PAGES_TO_SCAN + ' Pages');
		return iterator(1,PAGES_TO_SCAN);
	}

}

/*******************
  Private functions
 *******************/
 function collectHackernewsData($,posts) {
	$('.athing').each(function(index,el) {
		var data = {};
		var $topicAnchor = $(this).find('.title').last().children().eq(1);
		data['rate'] = Number($(this).find('.rank').text().replace('.',''));
		data['topic'] = $topicAnchor.text();
		data['url'] = $topicAnchor.attr('href');
		data['published_at'] = $(this).find('span.comhead').children().first().text();
		var $subtext = $(this).next().children().last();
		data['score'] = $subtext.find('.score').text();
		data['by_user'] = $subtext.children().eq(1).text();
		data['age'] = $subtext.find('.age').children().first().text();
		data['comments'] = $subtext.children().last().text();
		posts.push(data);
	});
 }

 // Iterator
function iterator(i,PAGES_TO_SCAN) {
	// Stop itereting & write data
	if(i > PAGES_TO_SCAN) {
		return writeFile('hackernews',posts);
	}
	request.get(URL + i, function(err,rsp,body) {
		if(err || !body)
			return iterator(i,PAGES_TO_SCAN);
		
		$ = cheerio.load(body);
		console.log('Scanning page number ' + i);

		collectHackernewsData($,posts);
		i++;
		iterator(i,PAGES_TO_SCAN);
	});
}
