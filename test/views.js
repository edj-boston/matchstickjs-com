var argv   = require('yargs').argv,
    fs     = require('fs'),
    jquery = require('jquery'),
    jsdom  = require('jsdom').jsdom,
    moment = require('moment'),
    should = require('should'),
    zlib   = require('zlib');


// Helper to instantiate JSDom
function loadDocument(data) {
    var port = argv.p || 3000;

    return jsdom(data.toString(), {
        url : 'http://localhost:' + port + '/'
    }).defaultView.document;
}


describe('The dynamically generated HTML index file...', function() {

    var handle = 'build/index.html';
    var buf, document;

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
            document = loadDocument(data);
            done();
        });
    });

    it('Should contain a <title> element from the header partial', function() {
        document.getElementsByTagName('title')[0].innerHTML
            .should.equal('MatchstickJS');
    });

    it('Should contain only one <h1> element from the markdown source', function() {
        document.getElementsByTagName('h1').length
            .should.equal(1);
    });

    it('Should contain an <ul> element from the share partial with the id "share"', function() {
        should.exist(document.getElementById('share'));
    });

    it('Should contain copyright text from the footer partial', function() {
        document.getElementById('copyright').innerHTML
            .should.containEql(moment().format('YYYY'));
    });

});


describe('The dynamically generated HTML error file...', function() {

    var handle = 'build/error.html';
    var buf, document;

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
            document = loadDocument(data);
            done();
        });
    });

    it('Should contain a <title> element from the header partial', function() {
        document.getElementsByTagName('title')[0].innerHTML
            .should.equal('MatchstickJS');
    });

    it('Should contain an <h1> element with certain text', function() {
        document.getElementById('page-not-found').innerHTML
            .should.equal('Oops! Nothing here');
    });

    it('Should contain copyright text from the footer partial', function() {
        document.getElementById('copyright').innerHTML
            .should.containEql(moment().format('YYYY'));
    });

});