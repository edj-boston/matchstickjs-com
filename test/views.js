// External dependencies
var assert = require('assert'),
	$	   = require('jquery')(require('jsdom').jsdom().defaultView),
	should = require('should'),
	fs     = require('fs'),
	moment = require('moment');


// Test to see if dynamically created HTML index is well-formed
describe('The dynamically generated HTML index file...', function() {

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
		if( $(file).find('h1') == 1 ) {
			throw Error('/index.html does not contain an <h1> element');
		}
	});

	it('Should contain an <ul> element from the share partial', function() {
		var file = fs.readFileSync('build/index.html', 'utf-8');
		if(file.indexOf('<ul id="share">') < 0) {
			throw Error('/index.html does not contain the right <ul> element');
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

// Test to see if dynamically created HTML error page is well-formed
describe('The dynamically generated HTML error file...', function() {

	it('Should exist', function() {
		if( !fs.existsSync('build/404.html') ) {
			throw Error('/404.html does not exist');
		}
	});

	it('Should contain a <title> element from the header partial', function() {
		var file = fs.readFileSync('build/404.html', 'utf-8');
		if(file.indexOf('<title>MatchstickJS</title>') < 0) {
			throw Error('/404.html does not contain the right <title> element');
		}
	});

	it('Should contain an <h1> element with certain text', function() {
		var file = fs.readFileSync('build/404.html', 'utf-8');
		if(file.indexOf('<h1 id="page-not-found">Page not found</h1>') < 0) {
			throw Error('/404.html does not contain the right <h1> element');
		}
	});

	it('Should contain copyright text from the footer partial', function() {
		var file = fs.readFileSync('build/404.html', 'utf-8');
		var str = '&copy; ' + moment().format('YYYY');
		if(file.indexOf(str) < 0) {
			throw Error('/404.html does not contain the right copyright text');
		}
	});

});