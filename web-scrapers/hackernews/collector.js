const request = require('request');
const cheerio = require('cheerio');
const { writeFile } = require('../utils/utils.js');

const URL = 'https://news.ycombinator.com/news?p=';

Array.prototype.extend = function(arr) {
	arr.forEach(item => this.push(item));
}

/***********
   Exports
 ***********/
module.exports = {

	scrape(PAGES_TO_SCAN) {
		const promises = [];
		for(let page = 1; page <= PAGES_TO_SCAN; page++) {
			promises.push(createPromise(page));
		}
		console.log(`Start Scanning ${PAGES_TO_SCAN} Pages`);

		Promise.all(promises)
			.then(results => {
				const posts = [];
				results.forEach(result => posts.extend(result));
				writeFile('hackernews', posts)
			})
			.catch(err => {
				console.log(err);
			});
	}

}

/*******************
  Private functions
 *******************/
function collectHackernewsData($) {
	const posts = [];
	$('.athing').each(function(index,el) {
		const data = {};
		const $topicAnchor = $(this).find('.title').last().children().eq(1);
		data['rate'] = Number($(this).find('.rank').text().replace('.',''));
		data['topic'] = $topicAnchor.text();
		data['url'] = $topicAnchor.attr('href');
		data['published_at'] = $(this).find('span.comhead').children().first().text();
		const $subtext = $(this).next().children().last();
		data['score'] = $subtext.find('.score').text();
		data['by_user'] = $subtext.children().eq(1).text();
		data['age'] = $subtext.find('.age').children().first().text();
		data['comments'] = $subtext.children().last().text();
		posts.push(data);
	});
	return posts;
}

function createPromise(page) {
	const promise = new Promise((resolve, reject) => {
		const url = `${URL}${page}`;
		request.get(url, (err, rsp, body) => {
			if(err || !body)
				return reject('Action Failed');
			let $ = cheerio.load(body);
			console.log(`Scanning page number ${page}`);
			resolve(collectHackernewsData($));
		});
	});
	return promise;
}
