var fs   = require('fs'),
    zlib = require('zlib');


describe('The dynamically concatenated and minified JS...', () => {

    var handle = 'build/js/all.min.js';
    var buf = null;
    var str = '';

    it('Should exist', (done) => {
        fs.readFile(handle, (err, data) => {
            if (err) throw err;
            buf = data;
            done();
        });
    });

    it('Should be gzipped', (done) => {
        zlib.gunzip(buf, (err, data) => {
            if (err) throw err;
            str = data;
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