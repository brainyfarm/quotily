const request = require('request');
const QUOTE_API_URL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

var QuoteClass = Quote.prototype; 

function Quote(){ /* do  you setup here*/}

QuoteClass.getNewQuote = function(callback){
	request(QUOTE_API_URL, function(error, response, body){
		if (!error && response.statusCode === 200) 
			callback(body);
		else 
			return false;
	});
};


module.exports = Quote; 