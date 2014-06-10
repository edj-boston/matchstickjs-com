// External dependencies
var assert = require('assert'),
	should = require('should'),
	fs     = require('fs');


// Test to see if AWS credentials are present
describe('The AWS credentials...', function() {

	it('Should exist', function() {
		if( !fs.existsSync('aws.json') ) {
			throw Error('aws.json does not exist');
		}
	});

	it('Should be valid JSON', function() {
		var str = fs.readFileSync('aws.json', 'utf-8');
		if( typeof JSON.parse(str) != 'object' ) {
			throw Error('aws.json is not valid JSON');
		}
	});

	it('Should contain a "key" property', function() {
		var str = fs.readFileSync('aws.json', 'utf-8');
		var obj = JSON.parse(str);
		if( obj.hasOwnProperty('key') == false ) {
			throw Error('aws.json does not contain a "key" property');
		}
	});

	it('Should contain a "secret" property', function() {
		var str = fs.readFileSync('aws.json', 'utf-8');
		var obj = JSON.parse(str);
		if( obj.hasOwnProperty('secret') == false ) {
			throw Error('aws.json does not contain a "secret" property');
		}
	});

	it('Should contain a "dist" property', function() {
		var str = fs.readFileSync('aws.json', 'utf-8');
		var obj = JSON.parse(str);
		if( obj.hasOwnProperty('dist') == false ) {
			throw Error('aws.json does not contain a "dist" property');
		}
	});

});