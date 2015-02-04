// Example of how to write all stemmed words to a new file

var htmlStemmer = require('../index.js'),
		fs = require('fs');

// Sadly, using regular expressions as keys in Javascript doesn't work when
// declaring literal objects. Filters must be regular expressions, and must be
// added using bracket notation.
// Note that filters are optional, and by default only html tags are filtered out.
filters = {};

// Used to filter out escaped symbols, i.e. &apos, into empty strings.
filters[/&\w+;/gi] = '';

htmlStemmer.initialize({
	filters: filters

	// Several other options possible (read docs)
});

// getStemmedWords takes a filename, and a callback which will be passed
// an array of all stemmed words. In this case, we simply write out each
// of the words to a file (with a newline for readability)
htmlStemmer.getStemmedWords('raw_example_data.txt', function(stemmedWords) {
	stemmedWords.forEach(function(word) {
		fs.appendFileSync('stemmed_example_data.txt', word + '\n');
	});
});