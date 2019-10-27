const request = require('request-promise');
const jar = request.jar();
const HOST = 'https://www.bing.com/translator';
const DUMMY_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36';

exports.fetch = async function() {
  const res = await request({
    jar: jar,
    url: HOST,
    headers: {
      'User-Agent' : DUMMY_AGENT
    },
    simple: false, 
    resolveWithFullResponse: true
  })

  if(res.statusCode == 200) {
    const shyCookie = res.headers['set-cookie'][0].split(' ')[0];
    const cookies = jar.getCookieString(HOST) + ('; ' + shyCookie);
    return cookies;
  }
  throw res;
};
