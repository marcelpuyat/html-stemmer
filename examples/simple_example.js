var htmlStemmer = require('../index.js');

filters = {};
filters[/&#x[0-9]+;/gi] = ' ';
htmlStemmer.initialize({
	filters: filters
});

htmlStemmer.getStemmedWords('examples/example_data.txt');