// Converting fortune cookie function in to module

// array fortuneCookies will be completely hidden.
var fortunes = [
	"Conquer your fears or they will conquer you", 
	"Rivers need springs",
	"Do not fear what you don't know",
	"You will have a pleasant surprises",
	"Whenever possible, keep it simple"
];


// global variable exports. 
// If you want something to be visible outside of the module, you have to add it to exports
exports.getFortune = function() {
	var idx = Math.floor( Math.random() * fortunes.length );
	return fortunes[idx];
};