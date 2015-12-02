// External dependencies
var assert = require('assert'),
    should = require('should'),
    fs     = require('fs'),
    zlib   = require('zlib');


// Test to see if dynamically created JS is well-formed
describe('The dynamically concatenated and minified JS...', function() {

    var handle = 'build/js/all.min.js';
    var file = zlib.gunzipSync(fs.readFileSync(handle));

    it('Should exist', function() {
        if ( !fs.existsSync(handle) ) {
            throw Error('/js/all.min.js does not exist');
        }
    });

    it('Should contain jQuery', function() {
        if (file.indexOf('jQuery JavaScript Library') < 0) {
            throw Error('/js/all.min.js does not contain jQuery');
        }
    });

    it('Should contain Bootstrap', function() {
        if (file.indexOf('Bootstrap') < 0) {
            throw Error('/js/all.min.js does not contain Bootstrap');
        }
    });

    it('Should contain custom JavaScript', function() {
        if (file.indexOf('Custom JavaScript') < 0) {
            throw Error('/js/all.min.js does not contain custom JavaScript');
        }
    });

    it('Should contain Google Analytics', function() {
        if (file.indexOf('Google Analytics') < 0) {
            throw Error('/js/all.min.js does not contain Google Analytics');
        }
    });

});