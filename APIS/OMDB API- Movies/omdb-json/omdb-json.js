{

const link = document.getElementById('link');
const movieInput = document.getElementById('movie-query');
const json_container = document.getElementById('json-container');
const movies_container = document.getElementById('container');

// OMDB URL, with the parameters to use for the restful api
const OMDB_URL = 'http://www.omdbapi.com/?apikey={api_key}&r=json&plot=full&t='; // r={json,xml} / plot={short,full} / t={title}

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if(xhr.status == 200 && xhr.readyState == 4) {
		let rsp = JSON.parse(xhr.responseText);
		if(rsp.Response == 'False') {
			return alert('No Response!');
		}
		_sequence(rsp);
	}
}

// Prints the JSON response on the screen
function _buildJson(rsp) {
	var data = '{<br>';
	for(let key in rsp) {
		data += '&nbsp;&nbsp;<span style="color:red">' + key + '</span>: ' + '  <span style="color:navy">' + rsp[key] + '</span>,<br>';
	}
	data += '}';
	return data;
}

// Creates link to IMDB
function _buildLink(rsp) {
	link.href = 'http://www.imdb.com/title/' + rsp.imdbID;
	link.innerHTML = rsp.Title + ' on IMDB';
}

// Appends movie panel to the rest of the panels
function _appendMovie(rsp) {
	let movie = 
		[
			'<div class="movie-panel-wrapper">',
				'<div class="movie-panel">',
					'<div class="movie-title">',
						'<span class="float-left">' + rsp.Title + '</span>',
						'<span class="float-right">' + rsp.Year + '</span>',
						'<div class="clear"></div>',
					'</div>',
					'<div class="movie-poster">',
						'<img src="' + rsp.Poster + '" title="' + rsp.Title + '" />',
					'</div>',
					'<div class="movie-plot">',
						'<span>' + rsp.Plot + '</span>',
					'</div>',	
				'</div>',
				'<div class="movie-footer">',
					'<span class="float-left">' + rsp.Genre + '</span>',
					'<span class="float-right">IMDB Rank: ' + rsp.imdbRating + '</span>',
					'<div class="clear"></div>',
				'</div>',			
			'</div>'	
		].join('');
	movies_container.innerHTML += movie;
}

// Makes sure the panels all have the largest panel's height 
function _setLargestHeight() {
	let lg_height = 0;
	const movie_wrappers = document.getElementsByClassName('movie-panel-wrapper');
	const movies = document.getElementsByClassName('movie-panel');
	for(let i=0; i<movies.length; i++) {
		let movie = movies[i];
		if(movie.offsetHeight > lg_height) {
			lg_height = movie.offsetHeight;
		}
	}
	for(let i=0; i<movie_wrappers.length; i++) {
		let wrapper = movie_wrappers[i];
		wrapper.style.height = lg_height + 15 + 'px';
	}	
}

// Sequence of actions
function _sequence(rsp) {
	json_container.innerHTML = _buildJson(rsp);
	buildLink(rsp);
	appendMovie(rsp);
	setLargestHeight();
}

// Makes ajax calls on search query change
movieInput.addEventListener('change', (evt) => {
	let query = evt.target.value.trim();
	if(!query) {
		return;
	}
	xhr.open('GET', OMDB_URL + query, true);
	xhr.send();
});

}