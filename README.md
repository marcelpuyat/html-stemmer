# html-stemmer #

Main repo: [https://github.com/marcelpuyat/html-stemmer](https://github.com/marcelpuyat/html-stemmer)

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

__Example:__
<pre>
htmlStemmer.initialize({
  includeTags: true,
  caseSensitive: true,
  delimiter: /[^A-Za-Z0-9]+/gi
});
</pre>
	
__Options:__

*Note that all of these are optional*
* `includeTags` - true or false. Filters out html tags (i.e. '\<body\>' is deleted) when false. false by default
* `filters` - An object that maps regular expressions to what they should be replaced by.
	```
	// Example that filters '&apos;' into an apostrophe and '&quot;' into a quotation mark
	filters = {};
	
	filters[/&apos;/gi] = '\'';
	filters[/&quot;/gi] = '"';
	
	htmlStemmer.initialize({
	  filters: filters
	});
	```
* `stopWords` - true or false. Excludes stop words (i.e. 'for', 'to', etc.) from final array returned by getStemmedWords if true. List of stop words used is available [here](https://github.com/huned/node-stopwords/blob/master/english.js). true by default.
* `caseSensitive` - true or false. Converts all characters to lowercase when false. false by default.
* `stemmed` - true or false. Stems each word using [Porter2](https://www.npmjs.com/package/stem-porter) when true. true by default.
* `delimiter` - A RegExp delimiter that is used to split the data into tokens. By default, /[^A-Za-z]+/gi is used.

### getStemmedWords(filePath, callbackFn)

Returns an array containing all stemmed words according to the options specified in `initialize`. Because file reading is done asynchronously, a callback function is required to get the array of stemmed words.

__Example:__
<pre>
htmlStemmer.getStemmedWords('filename', function(stemmedWordsArray) {
  console.log(stemmedWordsArray); // Prints out all stemmed words in 'filename'
});
</pre>
