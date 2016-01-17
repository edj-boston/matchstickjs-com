'use strict';

var fs = require('fs');


describe('The dynamically concatenated and minified JS...', () => {

    var str;

    it('Should exist', (done) => {
        fs.readFile('build/js/all.min.js', (err, data) => {
            if (err) throw err;
            str = data.toString();
            done();
        });
    });

    it('Should contain jQuery', () => {
        str.indexOf('jQuery JavaScript Library').should.not.equal(-1);
    });

    it('Should contain Bootstrap', () => {
        str.indexOf('Bootstrap').should.not.equal(-1);
    });

    it('Should contain custom JavaScript', () => {
        str.indexOf('Custom JavaScript').should.not.equal(-1);
    });

    it('Should contain Google Analytics', () => {
        str.indexOf('Google Analytics').should.not.equal(-1);
    });

});