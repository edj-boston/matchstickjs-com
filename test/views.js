// External dependencies
var assert = require('assert'),
	should = require('should'),
	fs     = require('fs'),
	moment = require('moment');

// Test to see if dynamically created CSS is well-formed
describe('The dynamically generated HTML...', function() {

	it('Should exist', function() {
		if( !fs.existsSync('build/index.html') ) {
			throw Error('/index.html does not exist');
		}
	});

	it('Should contain a <title> element from the header partial', function() {
		var file = fs.readFileSync('build/index.html', 'utf-8');
		if(file.indexOf('<title>MatchstickJS</title>') < 0) {
			throw Error('/index.html does not contain the right <title> element');
		}
	});

	it('Should contain an <h1> element from the markdown source', function() {
		var file = fs.readFileSync('build/index.html', 'utf-8');
		if(file.indexOf('<h1 id="matchstick">Matchstick</h1>') < 0) {
			throw Error('/index.html does not contain the right <h1> element');
		}
	});

	it('Should contain copyright text from the footer partial', function() {
		var file = fs.readFileSync('build/index.html', 'utf-8');
		var str = '&copy; ' + moment().format('YYYY');
		if(file.indexOf(str) < 0) {
			throw Error('/index.html does not contain the right copyright text');
		}
	});

});