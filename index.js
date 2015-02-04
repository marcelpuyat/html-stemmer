(function() {
	var stemmer = require('stem-porter'),
			stopWords = require('stopwords').english,
			fs = require('fs'),
			stopWordsHash = {},
			delimiter = /[^A-Za-z]+/gi,
			shouldStem = true,
			caseSensitive = false,
			regexFilters = [],
			defaultTagRegex = new RegExp('(<([^>]+)>)', 'ig'),
			defaultTagFilter = {regex: defaultTagRegex, replacement: ' '};

	regexFilters.push(defaultTagFilter);

	function initialize(options) {
		if (typeof options !== 'undefined' && options !== null) {

			if (options.includeTags === true) {
				// Empty default filter array if user specifies to include tags
				regexFilters = [];
			}

			if (typeof options.filters !== 'undefined' && options.filters instanceof Object) {
				addUserFilters(options.filters);
			}

			if (typeof options.stopWords !== 'undefined' && options.stopWords === false) {
				stopWords = [];
			}

			if (typeof options.caseSensitive !== 'undefined' && options.caseSensitive === true) {
				caseSensitive = true;
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

	function addUserFilters(userFilters) {
		var regex,
				newRegexFilter = {};

		for (var regexString in userFilters) {
			if (userFilters.hasOwnProperty(regexString)) {
				regex = convertStringToRegExp(regexString, "Filters must be regular expressions");
				newRegexFilter = {regex: regex, replacement: userFilters[regexString]};
				regexFilters.push(newRegexFilter);
			}
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

			var dataAsString = data.toString();
			if (!caseSensitive) {
				dataAsString = dataAsString.toLowerCase();
			}

			var filteredData = filterDataString(dataAsString),
					delimitedAndStopFilteredData = filteredData.split(delimiter).filter(function(word) {
						return word.length > 0 && !stopWordsHash[word];
					});

			if (shouldStem) {
				callback(delimitedAndStopFilteredData.map(function(word) {
					return stemmer(word);
				}));
			} else {
				callback(delimitedAndStopFilteredData)
			}
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