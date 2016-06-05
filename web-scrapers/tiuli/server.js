

/*****************************
   Using node.js core modules
 *****************************/
var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req,res) {
	if(req.url === '/') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(fs.readFileSync(__dirname + '/tiuli.html', 'utf-8'));
	}
	else if(req.url === '/jsons/high_rated.json') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(fs.readFileSync(__dirname + '/jsons/high_rated.json', 'utf-8'));
	}
	else if(req.url === '/tiuli.css') {
		res.writeHead(200, {'Content-Type': 'text/css'});
		res.end(fs.readFileSync(__dirname + '/tiuli.css'));
	}
	else {
		res.end();
	}
});
server.listen(8000, function(err) {
	if(err)
		return err;
	console.log('listeninig on port: 8000!');
});



/**************************
   Using express framework
 **************************/
// var express = require('express');
// var app = express();
// app.use(express.static(__dirname));
// app.get('/', function(req,res) {
// 	res.sendFile(__dirname + '/tiuli.html');
// });
// app.listen(8000, function(err) {
// 	if(err)
// 		return err;
// 	console.log('listeninig on port: 8000!');
// });



/*************************
   Using template engine
 *************************/
// var fs = require('fs');
// var express = require('express');
// var app = express();
// app.set('view engine', 'ejs');
// app.set('views', __dirname);
// app.use(express.static(__dirname));
// app.get('/', function(req,res) {
// 	var trips = JSON.parse(fs.readFileSync(__dirname + '/jsons/high_rated.json', 'utf-8'));
// 	res.render('tiuli.ejs', {
// 		trips: trips
// 	});
// });
// app.listen(8000, function(err) {
// 	if(err)
// 		return err;
// 	console.log('listeninig on port: 8000!');
// });