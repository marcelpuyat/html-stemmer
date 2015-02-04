# html-stemmer #

Main repo: https://github.com/marcelpuyat/html-stemmer

## Overview ##

Extracts all words from a file, filtering out HTML tags, stemming using Porter2 and filtering out stop words.  

## Install ##

	npm install html-stemmer

## Usage ##

	var htmlStemmer = require('html-stemmer');

	htmlStemmer.initialize();

	htmlStemmer.getStemmedWords('filename', function(stemmedWordsArray) {
		console.log(stemmedWordsArray); // Prints out all stemmed words in 'filename'
	});

## Documentation ##

### initialize(options)

Initializes the stemmer, using default options when not specified.

__Options:__

*Note that all of these are optional*
* `includeTags` - `true` or `false`. Filters out html tags (i.e. '<body>' is deleted) when `false`. `false` by default
* `filters` - An object that maps regular expressions to what they should be replaced by.

	// Example that filters '&apos;' into an apostrophe
	filters = {};

	filters[/&apos;/gi] = '\'';

	htmlStemmer.initialize({
		filters: filters
	});
	
* `stopWords` - `true` or `false`. Excludes stop words (i.e. 'for', 'to', etc.) from final array returned by getStemmedWords if `true`. `true` by default.