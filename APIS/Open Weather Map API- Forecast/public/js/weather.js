$('.container > form').submit((evt) => {
	evt.preventDefault();
	let cityInput = $('.container > form > input');
	let [city, mode] = [cityInput.val().trim(), 'json'];
	if(!city) {
		return;
	}
	$.ajax({
		type: 'get',
		url: '/get-weather-forecast', 
		data: { city, mode },
		contentType: 'application/json',
		dataType: 'json',
		success(rsp) {
					rsp = JSON.parse(rsp);
					if(rsp.status && rsp.status == 'error') {
						return alert('An error has occured');
					}
					let { list } = rsp;
					let context = { city, list };

					let weatherTemplate = Handlebars.compile($('#weather-template').html());
					let compiledWT = weatherTemplate(context);
					$('#weather').html(compiledWT).css('border-top','1px solid black');

					cityInput.val('').blur();
		},
		error(xhr,status,error) {
			return alert('Some error has occured...');
		}	

	});
	
});