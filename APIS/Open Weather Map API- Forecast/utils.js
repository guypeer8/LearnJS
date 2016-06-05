const countryCode = {
	"Australia" : "en_au",
	"England" : "en",
	"Brazil" : "pt_br",
	"Bulgaria": "bg",
	"China" : "zh",
	"Japan" : "ja",
	"india" : "hi",
	"France" : "fr",
	"Italy" : "it",
	"Israel": "he",
	"Romania" : "ro",
	"Denmark" : "da",
	"Czech Republic" : "cs",
	"Lithuania" : "lv",
	"Ethiopia" : "am",
	"Finland" : "fi",
	"Estonia" : "et",
	"Georgia" : "ka",
	"Germany" : "de",
	"Greece" : "el",
	"Hungary" : "hu",
	"Indonezia" : "id",
	"Malaysia" : "ms",
	"Nepal" : "ne",
	"Pakistan" : "ur",
	"Netherlands" : "nl",
	"Philippines" : "fil",
	"Poland" : "pl",
	"Portugal" : "pt",
	"Russia" : "ru",
	"Serbia" : "sr",
	"Slovakia" : "sk",
	"Slovenia" : "sl",
	"Norway" : "no",
	"Spain" : "es",
	"Sri Lanka" : "si",
	"Sweden" : "sv",
	"Turkey" : "tr",
	"Ukraine" : "uk",
	"Britain" : "en_gb",
	"Vietnam" : "vi",
	"United States of America(USA)" : "en_us",
	"Thailand" : "th",
	"South Korea" : "ko",
	"Saudi Arabia" : "ar",
	"South Africa" : "af",
	"Catalonia" : "ca"
};

const ensureUpperLower = (country) => country.slice(0,1).toUpperCase() + country.slice(1).toLowerCase()

const parseUrlQuery = (url) => {
	let queryObject = {};
	let query = url.split('?')[1];
	query = query.split('&');
	query.forEach(param => {
		let parameters = param.split('=');
		queryObject[parameters[0]] = parameters[1];
	});
	return queryObject;
}

module.exports = {
	countryCode,
	ensureUpperLower,
	parseUrlQuery
}