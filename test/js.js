var fs   = require('fs'),
    zlib = require('zlib');


describe('The dynamically concatenated and minified JS...', function() {

    var handle = 'build/js/all.min.js';
    var buf = null;
    var str = '';

    it('Should exist', function(done) {
        fs.readFile(handle, function(err, data) {
            if (err) throw err;
            buf = data;
            done();
        });
    });

    it('Should be gzipped', function(done) {
        zlib.gunzip(buf, function(err, data) {
            if (err) throw err;
            str = data;
            done();
        });
    });

    it('Should contain jQuery', function() {
        str.indexOf('jQuery JavaScript Library').should.not.equal(-1);
    });

    it('Should contain Bootstrap', function() {
        str.indexOf('Bootstrap').should.not.equal(-1);
    });

    it('Should contain custom JavaScript', function() {
        str.indexOf('Custom JavaScript').should.not.equal(-1);
    });

    it('Should contain Google Analytics', function() {
        str.indexOf('Google Analytics').should.not.equal(-1);
    });

});