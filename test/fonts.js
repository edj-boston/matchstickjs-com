var fs = require('fs');


describe('The build/fonts directory...', function() {

    var files = [];

    before(function(done) {
        fs.readdir('build/fonts/', function(err, arr) {
            if (err) throw err;
            files = arr;
            done();
        });
    });

    it('Should include Font Awesome font files', function() {
        files.should.containEql('fontawesome-webfont.eot');
        files.should.containEql('fontawesome-webfont.svg');
        files.should.containEql('fontawesome-webfont.ttf');
        files.should.containEql('fontawesome-webfont.woff');
    });

    it('Should include Merriweather font files', function() {
        files.should.containEql('Merriweather.eot');
        files.should.containEql('Merriweather.svg');
        files.should.containEql('Merriweather.ttf');
        files.should.containEql('Merriweather.woff');
    });

    it('Should include Open-Sans font files', function() {
        files.should.containEql('OpenSans-Regular.eot');
        files.should.containEql('OpenSans-Regular.svg');
        files.should.containEql('OpenSans-Regular.ttf');
        files.should.containEql('OpenSans-Regular.woff');
    });

    it('Should include SourceCodePro font files', function() {
        files.should.containEql('sourcecodepro-regular.eot');
        files.should.containEql('sourcecodepro-regular.svg');
        files.should.containEql('sourcecodepro-regular.ttf');
        files.should.containEql('sourcecodepro-regular.woff');
    });

});