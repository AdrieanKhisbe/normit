const soundFetcher = require('./soundFetcher');
const textFetcher = require('./textFetcher');
const cookieFetcher = require('./cookieFetcher');
const urlConstructor = require('./urlConstructor');
const textHandler = require('./textResponseHandler');
const messages = require('./messages.json');

exports.run = async function(options) {
  const nonSpeakOptions = Object.assign({}, options, { speak: false });
  const cookies = await cookieFetcher.fetch();
  const textUrl = urlConstructor.url(nonSpeakOptions);

  const text = await textFetcher.fetch(textUrl, options.text, cookies).catch(err => {
    console.log(messages.connectionErr);
    throw err;
  })
  const translated = textHandler.text(text);
  console.log('=> ' + translated);

  if(options.speak) {
    options.translated_text = translated;
    console.log(options)
    const soundBinary = await soundFetcher.fetch(urlConstructor.url(options), cookies)
    const soundHandler = require('./soundResponseHandler');
    soundHandler.save(soundBinary);
    soundHandler.play();
  }
};
