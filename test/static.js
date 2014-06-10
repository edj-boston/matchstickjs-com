// External dependencies
var assert = require('assert'),
	should = require('should'),
	fs     = require('fs');


// Test to see if files copied from assets/static made it okay
describe('The assets copied from the assets/static directory...', function() {

	/* *
	 * Root files
	 */

	it('Should include a favicon file', function() {
		if( !fs.existsSync('build/favicon.ico') ) {
			throw Error('/favicon.ico does not exist');
		}
	});

	it('Should include a robots.txt file', function() {
		if( !fs.existsSync('build/robots.txt') ) {
			throw Error('/robots.txt does not exist');
		}
	});

	/* *
	 * Github buttons
	 */

	it('Should include a github button include', function() {
		if( !fs.existsSync('build/inc/github-btn.html') ) {
			throw Error('/inc/github-btn.html does not exist');
		}
	});

	/* *
	 * Images
	 */

	it('Should include a background image', function() {
		if( !fs.existsSync('build/img/bg.png') ) {
			throw Error('/img/bg.png does not exist');
		}
	});

	it('Should include a logotype image', function() {
		if( !fs.existsSync('build/img/logotype.png') ) {
			throw Error('/img/logotype.png does not exist');
		}
	});


	/* *
	 * Fonts
	 */

	it('Should include Merriweather font files', function() {
		if( !fs.existsSync('build/fonts/Merriweather.eot') ) {
			throw Error('/fonts/Merriweather.eot does not exist');
		}
		if( !fs.existsSync('build/fonts/Merriweather.svg') ) {
			throw Error('/fonts/Merriweather.svg does not exist');
		}
		if( !fs.existsSync('build/fonts/Merriweather.ttf') ) {
			throw Error('/fonts/Merriweather.ttf does not exist');
		}
		if( !fs.existsSync('build/fonts/Merriweather.woff') ) {
			throw Error('/fonts/Merriweather.woff does not exist');
		}
	});

	it('Should include Open-Sans font files', function() {
		if( !fs.existsSync('build/fonts/Open-Sans.eot') ) {
			throw Error('/fonts/Open-Sans.eot does not exist');
		}
		if( !fs.existsSync('build/fonts/Open-Sans.svg') ) {
			throw Error('/fonts/Open-Sans.svg does not exist');
		}
		if( !fs.existsSync('build/fonts/Open-Sans.ttf') ) {
			throw Error('/fonts/Open-Sans.ttf does not exist');
		}
		if( !fs.existsSync('build/fonts/Open-Sans.woff') ) {
			throw Error('/fonts/Open-Sans.woff does not exist');
		}
	});

	it('Should include SourceCodePro font files', function() {
		if( !fs.existsSync('build/fonts/SourceCodePro.eot') ) {
			throw Error('/fonts/SourceCodePro.eot does not exist');
		}
		if( !fs.existsSync('build/fonts/SourceCodePro.svg') ) {
			throw Error('/fonts/SourceCodePro.svg does not exist');
		}
		if( !fs.existsSync('build/fonts/SourceCodePro.ttf') ) {
			throw Error('/fonts/SourceCodePro.ttf does not exist');
		}
		if( !fs.existsSync('build/fonts/SourceCodePro.woff') ) {
			throw Error('/fonts/SourceCodePro.woff does not exist');
		}
	});

});