const request = require('request-promise');

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const textPayload = (text) => {
  var id = getRandomInt(20168810, 29163211);
  return JSON.stringify([{id, text}]);
};

exports.fetch = async function (url, text, cookies) {
  const res = await request({
    headers: {
      'Cookie': cookies,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    jar: true,
    url: url,
    encoding: 'utf8',
    body: textPayload(text),
    simple: false,
    resolveWithFullResponse: true
  });

  if (res.statusCode == 200) return res.body;

  throw res[0];
};
