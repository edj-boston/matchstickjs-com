// External dependencies
var assert = require('assert'),
    should = require('should'),
    fs     = require('fs');


describe('The build/fonts directory...', function() {

    it('Should include Font Awesome files', function() {
        if ( !fs.existsSync('build/fonts/fontawesome-webfont.eot') ) {
            throw Error('/fonts/fontawesome-webfont.eot does not exist');
        }
        if ( !fs.existsSync('build/fonts/fontawesome-webfont.svg') ) {
            throw Error('/fonts/fontawesome-webfont.svg does not exist');
        }
        if ( !fs.existsSync('build/fonts/fontawesome-webfont.ttf') ) {
            throw Error('/fonts/fontawesome-webfont.ttf does not exist');
        }
        if ( !fs.existsSync('build/fonts/fontawesome-webfont.woff') ) {
            throw Error('/fonts/fontawesome-webfont.woff does not exist');
        }
    });

    it('Should include Merriweather font files', function() {
        if ( !fs.existsSync('build/fonts/Merriweather.eot') ) {
            throw Error('/fonts/Merriweather.eot does not exist');
        }
        if ( !fs.existsSync('build/fonts/Merriweather.svg') ) {
            throw Error('/fonts/Merriweather.svg does not exist');
        }
        if ( !fs.existsSync('build/fonts/Merriweather.ttf') ) {
            throw Error('/fonts/Merriweather.ttf does not exist');
        }
        if ( !fs.existsSync('build/fonts/Merriweather.woff') ) {
            throw Error('/fonts/Merriweather.woff does not exist');
        }
    });

    it('Should include Open-Sans font files', function() {
        if ( !fs.existsSync('build/fonts/Open-Sans.eot') ) {
            throw Error('/fonts/Open-Sans.eot does not exist');
        }
        if ( !fs.existsSync('build/fonts/Open-Sans.svg') ) {
            throw Error('/fonts/Open-Sans.svg does not exist');
        }
        if ( !fs.existsSync('build/fonts/Open-Sans.ttf') ) {
            throw Error('/fonts/Open-Sans.ttf does not exist');
        }
        if ( !fs.existsSync('build/fonts/Open-Sans.woff') ) {
            throw Error('/fonts/Open-Sans.woff does not exist');
        }
    });

    it('Should include SourceCodePro font files', function() {
        if ( !fs.existsSync('build/fonts/SourceCodePro.eot') ) {
            throw Error('/fonts/SourceCodePro.eot does not exist');
        }
        if ( !fs.existsSync('build/fonts/SourceCodePro.svg') ) {
            throw Error('/fonts/SourceCodePro.svg does not exist');
        }
        if ( !fs.existsSync('build/fonts/SourceCodePro.ttf') ) {
            throw Error('/fonts/SourceCodePro.ttf does not exist');
        }
        if ( !fs.existsSync('build/fonts/SourceCodePro.woff') ) {
            throw Error('/fonts/SourceCodePro.woff does not exist');
        }
    });

});