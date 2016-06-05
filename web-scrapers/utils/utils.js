
var fs = require('fs');

module.exports = {

	writeFile: function(pathname,posts) {
		var p_name = 'jsons/' + pathname + '.json';
		fs.writeFile(p_name, JSON.stringify(posts), 'utf-8', function(err) {
			if(err)
				return console.log('could not write file');
			console.log('File Saved- "' + p_name + '" !');
		});	
	}

}	