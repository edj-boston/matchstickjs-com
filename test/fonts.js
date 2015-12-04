// External dependencies
var should = require('should'),
    fs     = require('fs');


describe('The build/fonts directory...', function() {

    it('Should include the right font files', function(done) {
        fs.readdir('build/fonts/', function(err, files) {
            files.should.containEql('fontawesome-webfont.eot');
            files.should.containEql('fontawesome-webfont.svg');
            files.should.containEql('fontawesome-webfont.ttf');
            files.should.containEql('fontawesome-webfont.woff');
            done();
        });
    });

    it('Should include Merriweather font files', function(done) {
        fs.readdir('build/fonts/', function(err, files) {
            files.should.containEql('Merriweather.eot');
            files.should.containEql('Merriweather.svg');
            files.should.containEql('Merriweather.ttf');
            files.should.containEql('Merriweather.woff');
            done();
        });
    });

    it('Should include Open-Sans font files', function(done) {
        fs.readdir('build/fonts/', function(err, files) {
            files.should.containEql('Open-Sans.eot');
            files.should.containEql('Open-Sans.svg');
            files.should.containEql('Open-Sans.ttf');
            files.should.containEql('Open-Sans.woff');
            done();
        });
    });

    it('Should include SourceCodePro font files', function(done) {
        fs.readdir('build/fonts/', function(err, files) {
            files.should.containEql('SourceCodePro.eot');
            files.should.containEql('SourceCodePro.svg');
            files.should.containEql('SourceCodePro.ttf');
            files.should.containEql('SourceCodePro.woff');
            done();
        });
    });

});