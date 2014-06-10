// External dependencies
var assert = require('assert'),
	should = require('should'),
	fs     = require('fs');


// Test to see if dynamically created JS is well-formed
describe('The dynamically concatenated and minified JS...', function() {

	it('Should exist', function() {
		if( !fs.existsSync('build/js/all.min.js') ) {
			throw Error('/js/all.min.js does not exist');
		}
	});

	it('Should contain jQuery', function() {
		var file = fs.readFileSync('build/js/all.min.js', 'utf-8');
		if(file.indexOf('jQuery JavaScript Library') < 0) {
			throw Error('/js/all.min.js does not contain jQuery');
		}
	});

	it('Should contain Bootstrap', function() {
		var file = fs.readFileSync('build/js/all.min.js', 'utf-8');
		if(file.indexOf('Bootstrap') < 0) {
			throw Error('/js/all.min.js does not contain Bootstrap');
		}
	});

	it('Should contain custom JavaScript', function() {
		var file = fs.readFileSync('build/js/all.min.js', 'utf-8');
		if(file.indexOf('Custom JavaScript') < 0) {
			throw Error('/js/all.min.js does not contain custom JavaScript');
		}
	});

	it('Should contain Google Analytics', function() {
		var file = fs.readFileSync('build/js/all.min.js', 'utf-8');
		if(file.indexOf('Google Analytics') < 0) {
			throw Error('/js/all.min.js does not contain Google Analytics');
		}
	});

});