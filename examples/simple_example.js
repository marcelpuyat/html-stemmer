var htmlStemmer = require('../index.js');

filters = {};
filters[/&#x[0-9]+;/gi] = ' ';
filters[/-&\w+;/gi] = ' ';
htmlStemmer.initialize({
	filters: filters,
	delimiter: '/[^A-Za-z]+/g'
});

htmlStemmer.getStemmedWords('examples/example_data.txt', console.log);