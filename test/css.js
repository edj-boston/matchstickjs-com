// External dependencies
var assert = require('assert'),
	should = require('should'),
	fs     = require('fs');


// Test to see if dynamically created CSS is well-formed
describe('The dynamically concatenated and minified CSS...', function() {

	it('Should exist', function() {
		if( !fs.existsSync('build/css/all.min.css') ) {
			throw Error('/css/all.min.css does not exist');
		}
	});

	it('Should contain Bootstrap styles', function() {
		var file = fs.readFileSync('build/css/all.min.css', 'utf-8');
		if(file.indexOf('Bootstrap') < 0) {
			throw Error('/css/all.min.css does not contain Bootstrap styles');
		}
	});

	it('Should contain Custom styles', function() {
		var file = fs.readFileSync('build/css/all.min.css', 'utf-8');
		if(file.indexOf('Custom Styles') < 0) {
			throw Error('/css/all.min.css does not contain custom styles');
		}
	});

	it('Should contain Font Awesome styles', function() {
		var file = fs.readFileSync('build/css/all.min.css', 'utf-8');
		if(file.indexOf('Font Awesome') < 0) {
			throw Error('/css/all.min.css does not contain Font Awesome styles');
		}
	});

});