const Twitter = require('twitter');

var PostQuoteClass = PostQuote.prototype;

function PostQuote (path_obj) {
	this.twitter_path = path_obj.twitter_path;
};


PostQuoteClass.toTwitter = function(config_params, quote, callback){
	var client = new Twitter(config_params);

	client.post(this.twitter_path, {status: quote}, function(error, tweet, response){
		if(error) {console.log(error) }; 
		 callback(tweet);
	});
};

module.exports = PostQuote; 
