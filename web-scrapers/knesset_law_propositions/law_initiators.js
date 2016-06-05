const request = require('request');
const cheerio = require('cheerio');
const writeFile = require('../utils/utils.js').writeFile;

/*********
  Exports
 *********/
module.exports = {

	crawlLawInitiators(posts) {
		console.log('There are ' + posts.length + ' posts');
		iterator(0, posts, []); // start at 0, iterate over posts, initial data array empty
	}

}

/*******************
  Private Functions
 ******************/
 /* 1- Crawl initiators */
 function iterator(i,posts,laws_data) {
 	if(i === posts.length) { // indicates when to stop iterating
 		return writeFile('law_initiators',laws_data);
 	}
 	let post = posts[i];
  	request.get(post.link, function(err,rsp,body) {
 		if(err || !body)
 			return iterator(i,posts,laws_data); // Keep Going on Error
 		var $ = cheerio.load(body);
 		console.log('Scanning initiators on post number ' + (i + 1));
 		var inits = crawlInitiators($); // return members
 		var law_prop = {'proposition_link':post.link, 'proposition_type':post.type, 'proposition_time':post.when};
 		law_prop.proposition_initiators = inits;
 		laws_data.push(law_prop);
 		i++;
 		iterator(i,posts,laws_data); // iterate
 	});	
 }

/* 2- Get members who initiated the law */
 function crawlInitiators($) {
 	let members = [];
 	$('.card-party-members .party-member-photo').each(function(index,el) {
 		var member = {};
 		var $info = $(this).children();
 		member['image'] = $info.first().find('img').attr('src');
 		member['name'] = $info.first().find('.party-member-name').text();
 		var $party_info = $info.find('.party-member-info .party-member-info-text').children();
 		member['role'] = $party_info.eq(1).text();
 		var $party = $party_info.find('div a');
 		member['party'] = $party.text();
 		member['party_link'] = 'https://oknesset.org' + $party.attr('href');
 		members.push(member);
 	});
 	return members;
 } 