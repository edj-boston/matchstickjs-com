// External dependencies
var assert = require('assert'),
    should = require('should'),
    fs     = require('fs'),
    zlib = require('zlib');

// Test to see if dynamically created CSS is well-formed
describe('The dynamically concatenated and minified CSS...', function() {

    var handle = 'build/css/all.min.css';
    var file = zlib.gunzipSync(fs.readFileSync(handle));

    it('Should exist', function() {
        if ( !fs.existsSync(handle) ) {
            throw Error('/css/all.min.css does not exist');
        }
    });

    it('Should contain Bootstrap styles', function() {
        if (file.indexOf('Bootstrap') < 0) {
            throw Error('/css/all.min.css does not contain Bootstrap styles');
        }
    });

    it('Should contain Custom styles', function() {
        if (file.indexOf('Custom Styles') < 0) {
            throw Error('/css/all.min.css does not contain custom styles');
        }
    });

    it('Should contain Font Awesome styles', function() {
        if (file.indexOf('Font Awesome') < 0) {
            throw Error('/css/all.min.css does not contain Font Awesome styles');
        }
    });

});