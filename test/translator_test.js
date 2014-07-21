var chai = require('chai');
var nock = require('nock');
var fs = require('fs');
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var expect = chai.expect;

describe('translator', function() {
  var tr = require("./../lib/translator");
  var options = {
    from: 'en',
    to: 'es',
    text: 'donkey',
    speak: true,
    synonyms: true
  };

  before(function() {
    var googleResponse = fs.readFileSync('./test/fixtures/rawTextResponse', 'utf8');
    nock('http://translate.google.com').post('/translate_a/t?client=t&sl=en&tl=es&hl=pl&sc=2&ie=UTF-8&oe=UTF-8&prev=enter&ssel=0&tsel=0&')
    .reply(200, googleResponse);

    nock('http://translate.google.com').post('/translate_tts?tl=es&ie=UTF-8&oe=UTF-8')
    .reply(200, '');

    sinon.spy(console, 'log');
  });

  it('works', function(done){
    tr.run(options).then(function() {
      expect(console.log).to.have.been.calledWith('=> burro');
      expect(console.log).to.have.been.calledWith('=> Synonyms: burro, asno, borrico, pollino, estúpido');
      done();
    });
  });
});
