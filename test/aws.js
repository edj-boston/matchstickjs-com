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

	it('Should contain a "key", "secret", and "dist" properties', function() {
		var str = fs.readFileSync('aws.json', 'utf-8');
		var obj = JSON.parse(str);

		obj.should.have.property('key').and.be.type('string');
		obj.should.have.property('secret').and.be.type('string');
		obj.should.have.property('dist').and.be.type('string');
	});

});