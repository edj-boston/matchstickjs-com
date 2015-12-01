// External dependencies
var assert = require('assert'),
	$	   = require('jquery')(require('jsdom').jsdom().defaultView),
	should = require('should'),
	fs     = require('fs'),
	moment = require('moment'),
	zlib   = require('zlib');


// Test to see if dynamically created HTML index is well-formed
describe('The dynamically generated HTML index file...', function() {

 	var handle = 'build/index.html';
	var file = zlib.gunzipSync(fs.readFileSync(handle));

	it('Should exist', function() {
		if ( !fs.existsSync(handle) ) {
			throw Error('/index.html does not exist');
		}
	});

	it('Should contain a <title> element from the header partial', function() {
		if (file.indexOf('<title>MatchstickJS</title>') < 0) {
			throw Error('/index.html does not contain the right <title> element');
		}
	});

	it('Should contain an <h1> element from the markdown source', function() {
		if ( $(file).find('h1') == 1 ) {
			throw Error('/index.html does not contain an <h1> element');
		}
	});

	it('Should contain an <ul> element from the share partial', function() {
		if (file.indexOf('<ul id="share">') < 0) {
			throw Error('/index.html does not contain the right <ul> element');
		}
	});

	it('Should contain copyright text from the footer partial', function() {
		var str = '&copy; ' + moment().format('YYYY');
		if (file.indexOf(str) < 0) {
			throw Error('/index.html does not contain the right copyright text');
		}
	});

});

// Test to see if dynamically created HTML error page is well-formed
describe('The dynamically generated HTML error file...', function() {

 	var handle = 'build/404.html';
	var file = zlib.gunzipSync(fs.readFileSync(handle));

	it('Should exist', function() {
		if ( !fs.existsSync(handle) ) {
			throw Error('/404.html does not exist');
		}
	});

	it('Should contain a <title> element from the header partial', function() {
		if (file.indexOf('<title>MatchstickJS</title>') < 0) {
			throw Error('/404.html does not contain the right <title> element');
		}
	});

	it('Should contain an <h1> element with certain text', function() {
		if (file.indexOf('<h1 id="page-not-found">Page not found</h1>') < 0) {
			throw Error('/404.html does not contain the right <h1> element');
		}
	});

	it('Should contain copyright text from the footer partial', function() {
		var str = '&copy; ' + moment().format('YYYY');
		if (file.indexOf(str) < 0) {
			throw Error('/404.html does not contain the right copyright text');
		}
	});

});