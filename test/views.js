'use strict';

const JSDOM = require('jsdom').JSDOM,
    argv    = require('yargs').argv,
    fs      = require('fs'),
    moment  = require('moment');


// Helper to instantiate JSDom
function loadDocument (data) {
    const port = argv.p || 3000;
    return new JSDOM(data.toString(), {
        url : `http://localhost:${port}/`
    }).window.document;
}


describe('The dynamically generated HTML index file...', () => {
    let document;

    it('Should exist', done => {
        fs.readFile('build/index.html', (err, data) => {
            if (err) throw err;
            document = loadDocument(data);
            done();
        });
    });

    it('Should contain a <title> element from the header partial', () => {
        document.getElementsByTagName('title')[0].innerHTML
            .should.equal('MatchstickJS');
    });

    it('Should contain only one <h1> element from the markdown source', () => {
        document.getElementsByTagName('h1').length
            .should.equal(1);
    });

    it('Should contain an <ul> element from the share partial with the id "share"', () => {
        document.getElementById('share')
            .should.exist;
    });

    it('Should contain copyright text from the footer partial', () => {
        document.getElementById('copyright').innerHTML
            .should.containEql(moment().format('YYYY'));
    });
});


describe('The dynamically generated HTML error file...', () => {
    let document;

    it('Should exist', done => {
        fs.readFile('build/error.html', (err, data) => {
            if (err) throw err;
            document = loadDocument(data);
            done();
        });
    });

    it('Should contain a <title> element from the header partial', () => {
        document.getElementsByTagName('title')[0].innerHTML
            .should.equal('MatchstickJS');
    });

    it('Should contain an <h1> element with certain text', () => {
        document.getElementById('page-not-found').innerHTML
            .should.equal('Oops! Nothing here');
    });

    it('Should contain copyright text from the footer partial', () => {
        document.getElementById('copyright').innerHTML
            .should.containEql(moment().format('YYYY'));
    });
});
