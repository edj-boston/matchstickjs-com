// External dependencies
var assert = require('assert'),
    should = require('should'),
    fs     = require('fs');


// Test to see if files copied from assets/static made it okay
describe('The assets copied from the src/static directory...', function() {

    /* *
     * Root files
     */

    it('Should include a favicon file', function(done) {
        fs.stat('build/favicon.ico', function(err) {
            if( err) throw err;
            done();
        });
    });

    it('Should include a robots.txt file', function(done) {
        fs.stat('build/robots.txt', function(err) {
            if(err) throw err;
            done();
        });
    });


    /* *
     * Github buttons
     */

    it('Should include a github button include', function(done) {
        fs.stat('build/inc/github-btn.html', function(err) {
            if(err) throw err;
            done();
        });
    });

    /* *
     * Images
     */

    it('Should include a background image', function(done) {
        fs.stat('build/img/bg.png', function(err) {
            if(err) throw err;
            done();
        });
    });

    it('Should include a logotype image', function(done) {
        fs.stat('build/img/logotype.png', function(err) {
            if(err) throw err;
            done();
        });
    });

});