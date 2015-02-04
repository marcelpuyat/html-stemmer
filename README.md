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