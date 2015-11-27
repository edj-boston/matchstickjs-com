// External dependencies
var assert = require('assert'),
	should = require('should'),
	fs     = require('fs');


describe('The assets copied from node_modules/font-awesome...', function() {

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