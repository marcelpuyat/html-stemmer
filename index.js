(function() {
	var stemmer = require('stemmer'),
			stopWords = require('stopwords').english,
			fs = require('fs'),
			stopWordsHash = {},
			delimiter = /\s+/g,
			shouldStem = true,
			regexFilters = [],
			defaultTagRegex = new RegExp('(<([^>]+)>)', 'ig'),
			defaultTagFilter = {regex: defaultTagRegex, replacement: ' '};

	regexFilters.push(defaultTagFilter);

	function initialize(options) {
		if (typeof options !== 'undefined' && options !== null) {

			if (typeof options.includeTags === true) {
				// Empty default filter array if user specifies to include tags
				regexFilters = [];
			}

			if (typeof options.filters !== 'undefined') {
				// Add user specified filters to regexFilters array
				var filters = options.filters,
						match,
						regex,
						newRegexFilter = {};

				for (var regexString in filters) {
					if (filters.hasOwnProperty(regexString)) {
						regex = convertStringToRegExp(regexString, "Filters must be regular expressions");
						newRegexFilter = {regex: regex, replacement: filters[regexString]};
						regexFilters.push(newRegexFilter);
					}
				}
			}

			if (typeof options.stopWords !== 'undefined' && options.stopWords === false) {
				stopWords = [];
			}

			if (typeof options.stemmed !== 'undefined' && options.stemmed === false) {
				shouldStem = false;
			}

			if (typeof options.delimiter !== 'undefined') {
				delimiter = convertStringToRegExp(options.delimiter, "Delimiter must be a regular expression");
			}

			initializeStopWordsHash();
		}
	}

	function convertStringToRegExp(str, errorString) {
		var match = str.match(new RegExp('^/(.*?)/([gimy]*)$'));
		if (match === null || match === undefined) {
			throw errorString;
		}
		return new RegExp(match[1], match[2]);
	}

	function initializeStopWordsHash() {
		for (var i = 0; i < stopWords.length; i++) {
			stopWordsHash[stopWords[i]] = true;
		}
	}

	function getStemmedWords(filePath, callback) {
		fs.readFile(filePath, function(err, data) {
			if (err) throw err;

			var filteredData = filterDataString(data.toString());
			callback(filteredData.split(delimiter).filter(function(word) {
				return word.length > 0;
			}));
		});
	}

	function filterDataString(dataString) {
		var regexFilter;

		for (var i = 0; i < regexFilters.length; i++) {
			regexFilter = regexFilters[i];
			dataString = dataString.replace(regexFilter.regex, regexFilter.replacement);
		}

		return dataString;
	}

	if (typeof exports != 'undefined' && exports != null) {
		exports.initialize = initialize;
		exports.getStemmedWords = getStemmedWords;
	}

})();