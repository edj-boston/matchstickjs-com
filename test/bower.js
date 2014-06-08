// External dependencies
var assert = require('assert');
var should = require('should');
var fs = require('fs');


// Test to see if files copied from assets/bower made it okay
describe('The assets copied from the assets/bower directory...', function() {

	/* *
	 * Fontawesome
	 */

	it('Should include Font Awesome files', function() {
		if( !fs.existsSync('build/fonts/fontawesome-webfont.eot') ) {
			throw Error('/fonts/fontawesome-webfont.eot does not exist');
		}
		if( !fs.existsSync('build/fonts/fontawesome-webfont.svg') ) {
			throw Error('/fonts/fontawesome-webfont.svg does not exist');
		}
		if( !fs.existsSync('build/fonts/fontawesome-webfont.ttf') ) {
			throw Error('/fonts/fontawesome-webfont.ttf does not exist');
		}
		if( !fs.existsSync('build/fonts/fontawesome-webfont.woff') ) {
			throw Error('/fonts/fontawesome-webfont.woff does not exist');
		}
	});

});