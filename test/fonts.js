'use strict';

const fs = require('fs');


describe('The build/fonts directory...', () => {

    let files = [];

    before(done => {
        fs.readdir('build/fonts/', (err, arr) => {
            if (err) throw err;
            files = arr;
            done();
        });
    });

    it('Should include Font Awesome font files', () => {
        files.should.containEql('fontawesome-webfont.eot');
        files.should.containEql('fontawesome-webfont.svg');
        files.should.containEql('fontawesome-webfont.ttf');
        files.should.containEql('fontawesome-webfont.woff');
    });

    it('Should include Merriweather font files', () => {
        files.should.containEql('Merriweather.eot');
        files.should.containEql('Merriweather.svg');
        files.should.containEql('Merriweather.ttf');
        files.should.containEql('Merriweather.woff');
    });

    it('Should include Open-Sans font files', () => {
        files.should.containEql('OpenSans-Regular.eot');
        files.should.containEql('OpenSans-Regular.svg');
        files.should.containEql('OpenSans-Regular.ttf');
        files.should.containEql('OpenSans-Regular.woff');
    });

    it('Should include SourceCodePro font files', () => {
        files.should.containEql('sourcecodepro-regular.eot');
        files.should.containEql('sourcecodepro-regular.svg');
        files.should.containEql('sourcecodepro-regular.ttf');
        files.should.containEql('sourcecodepro-regular.woff');
    });

});
