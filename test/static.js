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
        if ( !fs.existsSync('build/favicon.ico') ) {
            throw Error('/favicon.ico does not exist');
        }
    });

    it('Should include a robots.txt file', function() {
        if ( !fs.existsSync('build/robots.txt') ) {
            throw Error('/robots.txt does not exist');
        }
    });

    /* *
     * Github buttons
     */

    it('Should include a github button include', function() {
        if ( !fs.existsSync('build/inc/github-btn.html') ) {
            throw Error('/inc/github-btn.html does not exist');
        }
    });

    /* *
     * Images
     */

    it('Should include a background image', function() {
        if ( !fs.existsSync('build/img/bg.png') ) {
            throw Error('/img/bg.png does not exist');
        }
    });

    it('Should include a logotype image', function() {
        if ( !fs.existsSync('build/img/logotype.png') ) {
            throw Error('/img/logotype.png does not exist');
        }
    });

});