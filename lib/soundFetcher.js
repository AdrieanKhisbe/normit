const request = require('request-promise');
const messages = require('./messages.json');

exports.fetch = async function (url, cookies) {
  const res = await request({
    headers: {
      'Cookie': cookies
    },
    jar: true,
    url,
    method: 'POST',
    encoding: 'binary',
    simple: false,
    resolveWithFullResponse: true
  });

  if (res.statusCode == 200) {
    return res.body;
  }
  if (res.statusCode == 400) {
    console.log(messages.cannotSpeak);
    throw new Error('Cannot speak')
  }
  throw res[0];
}
