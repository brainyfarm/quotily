const readline = require('readline');
const Quote = require("./quote.js");
const PostQuote = require("./post_quote.js");
const env = require('dotenv').config(); 

var prompt = readline.createInterface({ input: process.stdin, output: process.stdout });
var post_quote = new PostQuote({twitter_path: "statuses/update"});

var config_params = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET 
};


var quoteToTweet = new Quote();
var app = {
	exit: function(str){
		console.log(str);
		prompt.close(); 
		process.stdin.destroy(); 
	}
}; 


(function(){
	var answer = ""; 
	prompt.question("Enter 'yes' or 'no' \nDo you want a quote?: ", function(answer){
		if (answer == "yes") 
		{
			quoteToTweet.getNewQuote(function(quote){ 
				console.log(quote);

				answer = prompt.question("Enter 'yes' or 'no' \nDo you want to tweet this quote?: ", function (answer)
				{
					if (answer == "yes")
					{
						quote = JSON.parse(quote);
						post_quote.toTwitter(config_params, quote.quoteText, function(tweet){
							console.log(tweet);
						});
						app.exit("Response from twitter: ");
					}else {
						app.exit("It's a pain to see you leave this tweet unshared!");
					}
				});
			});
		}else {
			app.exit("Thanks for using my app"); 
		}
	});

})();
