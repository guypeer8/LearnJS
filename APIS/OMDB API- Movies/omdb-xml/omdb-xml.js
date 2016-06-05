{

const link = document.getElementById('link');
const movieInput = document.getElementById('movie-query');
const xml_container = document.getElementById('xml-container');
const movies_container = document.getElementById('container');

// OMDB URL, with the parameters to use for the restful api
const OMDB_URL = 'http://www.omdbapi.com/?apikey={api_key}&r=xml&plot=full&t='; // r={json,xml} / plot={short,full} / t={title}

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if(xhr.status == 200 && xhr.readyState == 4) {
		let rsp = xhr.responseXML;
		if(rsp.querySelector('root').getAttribute('response') == 'False') {
			return alert('No Response!');
		}
		let moviesXML = rsp.querySelector('movie');	
		xml_container.innerHTML = '';
		xml_container.appendChild(_buildXML(rsp));
		_sequence(moviesXML);
	}
}

// Prints the JSON response on the screen
function _buildXML(rsp) {
	let xmlText = new XMLSerializer().serializeToString(rsp);
	let xmlTextNode = document.createTextNode(xmlText);
	return xmlTextNode;
}

// Creates link to IMDB
function _buildLink(moviesXML) {
	link.href = 'http://www.imdb.com/title/' + moviesXML.getAttribute('imdbID');
	link.innerHTML = moviesXML.getAttribute('title') + ' on IMDB';
}

// Appends movie panel to the rest of the panels
function _appendMovie(moviesXML) {
	let movie = 
		[
			'<div class="movie-panel-wrapper">',
				'<div class="movie-panel">',
					'<div class="movie-title">',
						'<span class="float-left">' + moviesXML.getAttribute('title') + '</span>',
						'<span class="float-right">' + moviesXML.getAttribute('year') + '</span>',
						'<div class="clear"></div>',
					'</div>',
					'<div class="movie-poster">',
						'<img src="' + moviesXML.getAttribute('poster') + '" title="' + moviesXML.getAttribute('title') + '" />',
					'</div>',
					'<div class="movie-plot">',
						'<span>' + moviesXML.getAttribute('plot') + '</span>',
					'</div>',	
				'</div>',
				'<div class="movie-footer">',
					'<span class="float-left">' + moviesXML.getAttribute('genre') + '</span>',
					'<span class="float-right">IMDB Rank: ' + moviesXML.getAttribute('imdbRating') + '</span>',
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
function _sequence(moviesXML) {
	_buildLink(moviesXML);
	_appendMovie(moviesXML);
	_setLargestHeight();
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